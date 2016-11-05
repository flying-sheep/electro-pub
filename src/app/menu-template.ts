import { BrowserWindow, shell } from 'electron'

const { openExternal } = shell

function createDarwinTemplate(app: Electron.App): Electron.MenuItemOptions[] {
	return [
		{
			label: 'Electron',
			submenu: [
				{
					label: 'About Electron',
					role: 'about',
				},
				{ type: 'separator' },
				{
					label: 'Services',
					submenu: [],
				},
				{ type: 'separator' },
				{
					label: 'Hide Electron',
					accelerator: 'Command+H',
					role: 'hide',
				},
				{
					label: 'Hide Others',
					accelerator: 'Command+Shift+H',
					role: 'hideothers',
				},
				{
					label: 'Show All',
					role: 'unhide',
				},
				{ type: 'separator' },
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click() { app.quit() },
				},
			],
		},
		{
			label: 'Edit',
			submenu: [
				{
					label: 'Undo',
					accelerator: 'Command+Z',
					role: 'undo',
				},
				{
					label: 'Redo',
					accelerator: 'Shift+Command+Z',
					role: 'redo',
				},
				{ type: 'separator' },
				{
					label: 'Cut',
					accelerator: 'Command+X',
					role: 'cut',
				},
				{
					label: 'Copy',
					accelerator: 'Command+C',
					role: 'copy',
				},
				{
					label: 'Paste',
					accelerator: 'Command+V',
					role: 'paste',
				},
				{
					label: 'Select All',
					accelerator: 'Command+A',
					role: 'selectall',
				},
			],
		},
		{
			label: 'View',
			submenu: [
				{
					label: 'Reload',
					accelerator: 'Command+R',
					click() {
						const focusedWindow = BrowserWindow.getFocusedWindow()
						if (focusedWindow) focusedWindow.reload()
					},
				},
				{
					label: 'Toggle Full Screen',
					accelerator: 'Ctrl+Command+F',
					click() {
						const focusedWindow = BrowserWindow.getFocusedWindow()
						if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
					},
				},
				{
					label: 'Toggle Developer Tools',
					accelerator: 'Alt+Command+I',
					click() {
						const focusedWindow = BrowserWindow.getFocusedWindow()
						if (focusedWindow) focusedWindow.webContents.toggleDevTools()
					},
				},
			],
		},
		{
			label: 'Window',
			submenu: [
				{
					label: 'Minimize',
					accelerator: 'Command+M',
					role: 'minimize',
				},
				{
					label: 'Close',
					accelerator: 'Command+W',
					role: 'close',
				},
				{ type: 'separator' },
				{
					label: 'Bring All to Front',
					role: 'front',
				},
			],
		},
		{
			label: 'Help',
			submenu: [
				{
					label: 'Learn More',
					click() { openExternal('http://electron.atom.io') },
				},
				{
					label: 'Documentation',
					click() { openExternal('https://github.com/atom/electron/tree/master/docs#readme') },
				},
				{
					label: 'Community Discussions',
					click() { openExternal('https://discuss.atom.io/c/electron') },
				},
				{
					label: 'Search Issues',
					click() { openExternal('https://github.com/atom/electron/issues') },
				},
			],
		},
	]
}

function createLinWinTemplate(): Electron.MenuItemOptions[] {
	return [
		{
			label: '&File',
			submenu: [
				{
					label: '&Open',
					accelerator: 'Ctrl+O',
				},
				{
					label: '&Close',
					accelerator: 'Ctrl+W',
					click() {
						const focusedWindow = BrowserWindow.getFocusedWindow()
						if (focusedWindow) focusedWindow.close()
					},
				},
			],
		},
		{
			label: '&View',
			submenu: [
				{
					label: '&Reload',
					accelerator: 'Ctrl+R',
					click() {
						const focusedWindow = BrowserWindow.getFocusedWindow()
						if (focusedWindow) focusedWindow.reload()
					},
				},
				{
					label: 'Toggle &Full Screen',
					accelerator: 'F11',
					click() {
						const focusedWindow = BrowserWindow.getFocusedWindow()
						if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
					},
				},
				{
					label: 'Toggle &Developer Tools',
					accelerator: 'Shift+Ctrl+I',
					click() {
						const focusedWindow = BrowserWindow.getFocusedWindow()
						if (focusedWindow) focusedWindow.webContents.toggleDevTools()
					},
				},
			],
		},
		{
			label: 'Help',
			submenu: [
				{
					label: 'Learn More',
					click() { openExternal('http://electron.atom.io') },
				},
				{
					label: 'Documentation',
					click() { openExternal('https://github.com/atom/electron/tree/master/docs#readme') },
				},
				{
					label: 'Community Discussions',
					click() { openExternal('https://discuss.atom.io/c/electron') },
				},
				{
					label: 'Search Issues',
					click() { openExternal('https://github.com/atom/electron/issues') },
				},
			],
		},
	]
}

export default function createMenuTemplate(app: Electron.App): Electron.MenuItemOptions[] {
	return (process.platform === 'darwin') ? createDarwinTemplate(app) : createLinWinTemplate()
}
