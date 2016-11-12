import { app, protocol, ipcMain, BrowserWindow, Menu } from 'electron'

import windowStateKeeper = require('electron-window-state')
import * as eventToPromise from 'event-to-promise'

import parseArguments from './argument-parser'
import createMenuTemplate from './menu-template'
import EPub from './epub'
import { EPubHandler, AssetHandler } from './handlers'

const { args: files } = parseArguments(...process.argv)

process.on('unhandledRejection', console.error)

app.once('window-all-closed', () => app.quit())

protocol.registerStandardSchemes([EPubHandler.SCHEME, AssetHandler.SCHEME])

async function start() {
	await eventToPromise(app, 'ready')

	//new AssetHandler().register()
	
	const menu = Menu.buildFromTemplate(createMenuTemplate(app))
	Menu.setApplicationMenu(menu)
	
	const { x, y, width, height, manage } = windowStateKeeper({
		defaultWidth: 800,
		defaultHeight: 600,
	})
	const mainWindow = new BrowserWindow({
		x, y, width, height,
		autoHideMenuBar: true,
		useContentSize: true,
		webPreferences: {
			blinkFeatures: 'OverlayScrollbars',
		},
	})
	manage(mainWindow)
	mainWindow.loadURL(`file://${__dirname}/index.html`)
	mainWindow.focus()
	
	const contentsReady = eventToPromise(mainWindow.webContents, 'did-finish-load')
	
	function openEpub(epub: EPub) {
		mainWindow.webContents.send('toc', epub.toc)
		new EPubHandler(epub).register()
	}
	
	if (files.length > 0) {
		if (files.length > 1) console.warn('You supplied more than one path. Ignoring all but the first…')
		
		Promise.all([EPub.read(files[0]), contentsReady])
			.then(([epub, _]) => openEpub(epub))
	}  // else default UI
	
	ipcMain.on('open', (e, path) => {
		console.log(path)
		EPub.read(path).then(openEpub)
	})
}

start()
