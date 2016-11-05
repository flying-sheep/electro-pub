import { TableOfContents } from '../../app/epub'

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
				<Dropzone onDrop={Splash.onDrop} multiple={false}>
					<div style={{ padding: '1rem' }}>Drop an .epub file here or click to select one</div>
				</Dropzone>
			</div>
		)
	}
}

function renderChapter(toc: TableOfContents) {
	render(<Chapter chapter={`epub:${toc.href}`}/>, document.getElementById('main'))
}

ipcRenderer.on('toc', (e, toc) => {
	render(<Toc nodes={toc} onNodeClick={renderChapter}/>, document.getElementById('toc'))
})

document.addEventListener('DOMContentLoaded', () => {
	render(<Splash/>, document.getElementById('main'))
})