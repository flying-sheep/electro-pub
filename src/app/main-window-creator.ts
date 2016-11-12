import { BrowserWindow } from 'electron'

import windowStateKeeper = require('electron-window-state')

export default function createMainWindow(): Electron.BrowserWindow {
    const { x, y, width, height, manage } = windowStateKeeper({
		defaultWidth: 800,
		defaultHeight: 600,
	})
	const mainWindow = new BrowserWindow({
		x, y, width, height,
		show: false,
		autoHideMenuBar: true,
		useContentSize: true,
		webPreferences: {
			blinkFeatures: 'OverlayScrollbars',
		},
	})
	manage(mainWindow)
    
    return mainWindow
}
