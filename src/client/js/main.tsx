import '../style.css'
import { TableOfContents } from '../../app/epub'
import { EPubHandler, AssetHandler } from '../../app/handlers'

import { ipcRenderer } from 'electron'

import * as React from 'react'
import { render } from 'react-dom'
import * as Dropzone from 'react-dropzone'

import Toc from './components/Toc'
import Chapter from './components/Chapter'

class Splash extends React.Component<{}, {}> {
	static onDrop(files: File[]) {
		ipcRenderer.send('open', files[0].path)
	}
	render() {
		return (
			<div>
				<p>Select a file from the list or open one</p>
				<Dropzone onDrop={Splash.onDrop} multiple={false} className="drop-zone" activeClassName="active">
					Drop an .epub file here<br/>
					or click to select one
				</Dropzone>
			</div>
		)
	}
}

function renderChapter(toc: TableOfContents) {
	render(<Chapter chapter={`${EPubHandler.prefix}/${toc.href}`}/>, document.getElementById('main'))
}

ipcRenderer.on('toc', (e, toc) => {
	render(<Toc nodes={toc} onNodeClick={renderChapter}/>, document.getElementById('toc'))
})

document.addEventListener('DOMContentLoaded', () => {
	render(<Splash/>, document.getElementById('main'))
})
