'use strict'

import remote from 'remote'
import ipc from 'ipc'
import React from 'react'
import ReactDOM from 'react-dom'
import Dropzone from 'react-dropzone'

import Toc from './components/toc'

class Splash extends React.Component {
	render() {
		return <div>
			<p>Select a file from the list or open one</p>
			<Dropzone onDrop={this.onDrop} multiple={false}>
				<div style={{ padding: '1rem' }}>Drop an .epub file here or click to select one</div>
			</Dropzone>
		</div>
	}
	onDrop(files) {
		ipc.send('open', files[0].path)
	}
}

ipc.on('toc', toc => {
	window.toc = toc
	
	ReactDOM.render(<Toc nodes={toc}/>, document.getElementById('toc'))
})

ipc.on('chapter', chapter => {
	window.chapter = chapter
	
	ReactDOM.render(<Chapter chapter={chapter}/>, document.getElementById('main'))
})

document.addEventListener('DOMContentLoaded', e => {
	ReactDOM.render(<Splash/>, document.getElementById('main'))
})