'use strict'

import 'source-map-support/register'

import path from 'path'

import electron from 'electron'
const { app, ipcMain, BrowserWindow, Menu } = electron

import createMenuTemplate from './menu-template'
import event from './event-promise'
import EPub from './epub'

// Parse command line options.
const argv = process.argv.slice(2)  // ['electron', 'appname', ...]
let option = { file: null, help: false, version: false }
for (let arg of argv) {
	if (new Set(['--version', '-v']).has(arg)) {
		option.version = true
		break
	} else if (new Set(['--help', '-h']).has(arg)) {
		option.help = true
		break
	} else if (arg[0] == '-') {
		console.warn(`unknown option ${arg}`)
		continue
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

function openEpub(epub) {
	mainWindow.webContents.send('toc', epub.toc)
}

let mainWindow = null

app.once('window-all-closed', () => app.quit())

app.once('ready', () => {
	const menu = Menu.buildFromTemplate(createMenuTemplate(app))
	Menu.setApplicationMenu(menu)
	
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		autoHideMenuBar: true,
		useContentSize: true,
	})
	mainWindow.loadURL(`file://${__dirname}/index.html`)
	mainWindow.focus()
	
	//mainWindow.webContents.session.setProxy('ebook=ebook', () => null)
	
	if (option.file == null)
		return  // default UI
	
	Promise.all([
		event(mainWindow.webContents, 'did-finish-load'),
		EPub.read(option.file),
	]).then(([_, epub]) => {
		openEpub(epub)
	}).catch(e => {
		console.error(e)
		throw e
	})
})

ipcMain.on('open', (e, path) => {
	console.log(path)
	EPub.read(path).then(openEpub)
})