import electron from 'electron'
const { BrowserWindow, shell: { openExternal } } = electron

export default function createMenuTemplate(app) {
	if (process.platform == 'darwin') return [
		{
			label: 'Electron',
			submenu: [
				{
					label: 'About Electron',
					selector: 'orderFrontStandardAboutPanel:'
				},
				{
					type: 'separator'
				},
				{
					label: 'Services',
					submenu: []
				},
				{
					type: 'separator'
				},
				{
					label: 'Hide Electron',
					accelerator: 'Command+H',
					selector: 'hide:'
				},
				{
					label: 'Hide Others',
					accelerator: 'Command+Shift+H',
					selector: 'hideOtherApplications:'
				},
				{
					label: 'Show All',
					selector: 'unhideAllApplications:'
				},
				{
					type: 'separator'
				},
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click: function() { app.quit(); }
				},
			]
		},
		{
			label: 'Edit',
			submenu: [
				{
					label: 'Undo',
					accelerator: 'Command+Z',
					selector: 'undo:'
				},
				{
					label: 'Redo',
					accelerator: 'Shift+Command+Z',
					selector: 'redo:'
				},
				{
					type: 'separator'
				},
				{
					label: 'Cut',
					accelerator: 'Command+X',
					selector: 'cut:'
				},
				{
					label: 'Copy',
					accelerator: 'Command+C',
					selector: 'copy:'
				},
				{
					label: 'Paste',
					accelerator: 'Command+V',
					selector: 'paste:'
				},
				{
					label: 'Select All',
					accelerator: 'Command+A',
					selector: 'selectAll:'
				},
			]
		},
		{
			label: 'View',
			submenu: [
				{
					label: 'Reload',
					accelerator: 'Command+R',
					click: function() {
						let focusedWindow = BrowserWindow.getFocusedWindow()
						if (focusedWindow)
							focusedWindow.reload()
					}
				},
				{
					label: 'Toggle Full Screen',
					accelerator: 'Ctrl+Command+F',
					click: function() {
						let focusedWindow = BrowserWindow.getFocusedWindow()
						if (focusedWindow)
							focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
					}
				},
				{
					label: 'Toggle Developer Tools',
					accelerator: 'Alt+Command+I',
					click: function() {
						let focusedWindow = BrowserWindow.getFocusedWindow()
						if (focusedWindow)
							focusedWindow.toggleDevTools()
					}
				},
			]
		},
		{
			label: 'Window',
			submenu: [
				{
					label: 'Minimize',
					accelerator: 'Command+M',
					selector: 'performMiniaturize:'
				},
				{
					label: 'Close',
					accelerator: 'Command+W',
					selector: 'performClose:'
				},
				{
					type: 'separator'
				},
				{
					label: 'Bring All to Front',
					selector: 'arrangeInFront:'
				},
			]
		},
		{
			label: 'Help',
			submenu: [
				{
					label: 'Learn More',
					click: function() { openExternal('http://electron.atom.io') }
				},
				{
					label: 'Documentation',
					click: function() { openExternal('https://github.com/atom/electron/tree/master/docs#readme') }
				},
				{
					label: 'Community Discussions',
					click: function() { openExternal('https://discuss.atom.io/c/electron') }
				},
				{
					label: 'Search Issues',
					click: function() { openExternal('https://github.com/atom/electron/issues') }
				},
			]
		},
	]
	else return [
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
					click: function() {
						let focusedWindow = BrowserWindow.getFocusedWindow()
						if (focusedWindow)
							focusedWindow.close()
					}
				},
			]
		},
		{
			label: '&View',
			submenu: [
				{
					label: '&Reload',
					accelerator: 'Ctrl+R',
					click: function() {
						let focusedWindow = BrowserWindow.getFocusedWindow()
						if (focusedWindow)
							focusedWindow.reload()
					}
				},
				{
					label: 'Toggle &Full Screen',
					accelerator: 'F11',
					click: function() {
						let focusedWindow = BrowserWindow.getFocusedWindow()
						if (focusedWindow)
							focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
					}
				},
				{
					label: 'Toggle &Developer Tools',
					accelerator: 'Shift+Ctrl+I',
					click: function() {
						let focusedWindow = BrowserWindow.getFocusedWindow()
						if (focusedWindow)
							focusedWindow.toggleDevTools()
					}
				},
			]
		},
		{
			label: 'Help',
			submenu: [
				{
					label: 'Learn More',
					click: function() { openExternal('http://electron.atom.io') }
				},
				{
					label: 'Documentation',
					click: function() { openExternal('https://github.com/atom/electron/tree/master/docs#readme') }
				},
				{
					label: 'Community Discussions',
					click: function() { openExternal('https://discuss.atom.io/c/electron') }
				},
				{
					label: 'Search Issues',
					click: function() { openExternal('https://github.com/atom/electron/issues') }
				}
			]
		}
	]
}
