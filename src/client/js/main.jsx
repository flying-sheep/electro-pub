import { ipcRenderer } from 'electron'

import React from 'react'
import ReactDOM from 'react-dom'
import Dropzone from 'react-dropzone'

import Toc from './components/Toc'
import Chapter from './components/Chapter'


class Splash extends React.Component {
	static onDrop(files) {
		ipcRenderer.send('open', files[0].path)
	}
	render() {
		return (
			<div>
				<p>Select a file from the list or open one</p>
				<Dropzone onDrop={this.onDrop} multiple={false}>
					<div style={{ padding: '1rem' }}>Drop an .epub file here or click to select one</div>
				</Dropzone>
			</div>
		)
	}
}

ipcRenderer.on('toc', (e, toc) => {
	window.toc = toc
	
	ReactDOM.render(<Toc nodes={toc}/>, document.getElementById('toc'))
})

ipcRenderer.on('chapter', (e, chapter) => {
	window.chapter = chapter
	
	ReactDOM.render(<Chapter chapter={chapter}/>, document.getElementById('main'))
})

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(<Splash/>, document.getElementById('main'))
})
