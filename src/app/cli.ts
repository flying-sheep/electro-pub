import { install } from 'source-map-support'
install()

import { app, protocol, BrowserWindow, Menu } from 'electron'

import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'

import * as eventToPromise from 'event-to-promise'

import EPub from '../shared/epub'
import configureStore from '../shared/store'
import { setPath, setTOC } from '../shared/actions/epub'
import { isPathSet } from '../shared/reducers/epub'

import parseArguments from './argument-parser'
import createMenuTemplate from './menu-template'
import createMainWindow from './main-window-creator'
import { EPubHandler, AssetHandler } from './handlers'

const { args: files } = parseArguments(...process.argv)

process.on('unhandledRejection', console.error)

app.once('window-all-closed', () => app.quit())

protocol.registerStandardSchemes([EPubHandler.SCHEME, AssetHandler.SCHEME])

async function start() {
	await eventToPromise(app, 'ready')

	for (const ext of [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]) installExtension(ext)

	//new AssetHandler().register()
	
	const menu = Menu.buildFromTemplate(createMenuTemplate(app))
	Menu.setApplicationMenu(menu)
	
	const mainWindow = createMainWindow()
	mainWindow.loadURL(`file://${__dirname}/index.html`)
	
	const contentsReady = eventToPromise(mainWindow.webContents, 'did-finish-load')
	
	contentsReady.then(() => {
		mainWindow.show()
		mainWindow.focus()
	})
	
	const store = configureStore({ epub: {} }, 'main')  //TODO: load initialstate
	
	function openEpub(epub: EPub) {
		store.dispatch(setTOC(epub.toc))
		new EPubHandler(epub).register()
	}
	
	let lastPath = ''
	store.subscribe(() => {
		const { epub } = store.getState()
		if (!isPathSet(epub) || epub.path === lastPath) return
		lastPath = epub.path
		EPub.read(epub.path).then(openEpub)
	})
	
	if (files.length > 0) {
		if (files.length > 1) console.warn('You supplied more than one path. Ignoring all but the first…')
		await contentsReady // we need the renderer store to be ready
		store.dispatch(setPath(files[0]))
	}  // else default UI
}

start()
