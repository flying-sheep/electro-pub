import { app, ipcMain, BrowserWindow, Menu } from 'electron'

import * as eventToPromise from 'event-to-promise'

import createMenuTemplate from './menu-template'
import EPub from './epub'
import EPubHandler from './EPubHandler'

process.on('unhandledRejection', console.error)

// Parse command line options.
const argv = process.argv.slice(2)  // ['electron', 'appname', ...]
const option = { file: null as string | null, help: false, version: false }
for (const arg of argv) {
	if (new Set(['--version', '-v']).has(arg)) {
		option.version = true
		break
	} else if (new Set(['--help', '-h']).has(arg)) {
		option.help = true
		break
	} else if (arg[0] === '-') {
		console.warn(`unknown option ${arg}`)
	} else {
		option.file = arg
		break
	}
}

if (option.version) {
	console.log(`v${process.versions.electroPub}`)
	process.exit(0)
} else if (option.help) {
	const helpMessage = `\
Electro PUB v${process.versions.electroPub} – EPUB Reader

Usage: electro-pub [options] [path]

Open an epub book

Options:
  -h, --help     Print this usage message.
  -v, --version  Print the version.`
	console.log(helpMessage)
	process.exit(0)
}

app.once('window-all-closed', () => app.quit())

async function loadInitial(mainWindow: Electron.BrowserWindow, openEpub: Function, path: string) {
	const [epub, _] = await Promise.all([
		EPub.read(path),
		eventToPromise(mainWindow.webContents, 'did-finish-load'),
	])
	openEpub(epub)
}

async function start() {
	await eventToPromise(app, 'ready')
	
	const menu = Menu.buildFromTemplate(createMenuTemplate(app))
	Menu.setApplicationMenu(menu)
	
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		autoHideMenuBar: true,
		useContentSize: true,
	})
	mainWindow.loadURL(`file://${__dirname}/index.html`)
	mainWindow.focus()
	
	function openEpub(epub: EPub) {
		mainWindow.webContents.send('toc', epub.toc)
		new EPubHandler(epub).register()
	}
	
	if (option.file != null) {
		loadInitial(mainWindow, openEpub, option.file)
	}  // else default UI
	
	ipcMain.on('open', (e, path) => {
		console.log(path)
		EPub.read(path).then(openEpub)
	})
}

start()
