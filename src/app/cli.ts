import 'source-map-support/register'

import { app, protocol, BrowserWindow, Menu } from 'electron'

import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'

import * as eventToPromise from 'event-to-promise'

import EPub from '../shared/epub'
import configureStore from '../shared/store'
import { setPath, setBook } from '../shared/actions/epub'
import { RootState } from '../shared/reducers'
import { isPathSet, isLoaded } from '../shared/reducers/epub'

import parseArguments from './argument-parser'
import createMenuTemplate from './menu-template'
import createMainWindow from './main-window-creator'
import storage from './storage'
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
	
	const storedState = await storage.get('state')
	const initialState = Object.keys(storedState).length !== 0 ? storedState as RootState : { epub: {} }
	const store = configureStore(initialState, 'main')
	
	store.subscribe(async () => {
		await storage.set('state', store.getState())
	})
	
	async function openEpub(epub: EPub) {
		await new EPubHandler(epub).register()
		store.dispatch(setBook(epub.toc))
	}
	
	let lastPath = ''
	store.subscribe(() => {
		const { epub } = store.getState()
		if (!isPathSet(epub) || epub.path === lastPath) return
		lastPath = epub.path
		EPub.read(epub.path).then(openEpub)
	})
	
	await contentsReady
	
	if (files.length > 0) {
		if (files.length > 1) console.warn('You supplied more than one path. Ignoring all but the first…')
		store.dispatch(setPath(files[0]))  // we need the renderer store to be ready: contentsReady
	}  // else default UI
	
	mainWindow.show()
	mainWindow.focus()
}

start()
