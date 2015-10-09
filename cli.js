'use strict'

import app from 'app'
import dialog from 'dialog'
import fs from 'fs'
import path from 'path'
import Menu from 'menu'
import BrowserWindow from 'browser-window'
import { openExternal } from 'shell'

import createMenuTemplate from './menu-template'
import event from './event-promise'
import EPub from './epub'

// Quit when all windows are closed and no other one is listening to this.
app.on('window-all-closed', () => {
	if (app.listeners('window-all-closed').length == 1)
		app.quit()
})

// Parse command line options.
const argv = process.argv.slice(2)  // ['electron', 'appname', ...]
let option = { file: null, help: null, version: null }
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

// Create default menu.
app.once('ready', () => {
	const menu = Menu.buildFromTemplate(createMenuTemplate(app))
	Menu.setApplicationMenu(menu)
})

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

let mainWindow = null

// Quit when all windows are closed.
app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		'auto-hide-menu-bar': true,
		'use-content-size': true,
	})
	mainWindow.loadUrl(`file://${__dirname}/client/index.html`)
	mainWindow.focus()
	
	//mainWindow.webContents.session.setProxy('ebook=ebook', () => null)
	
	Promise.all([
		event(mainWindow.webContents, 'did-finish-load'),
		EPub.read(option.file),
	]).then(([_, epub]) => {
		console.log(epub)
		mainWindow.webContents.send('toc', epub.toc)
	}).catch(e => console.error(e))
})
