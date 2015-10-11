'use strict'

import remote from 'remote'
import ipc from 'ipc'
import ReactDOM from 'react-dom'

import Toc from './components/toc'

const Splash = props => <div>Hi!</div>

ipc.on('toc', toc => {
	window.toc = toc
	
	ReactDOM.render(<Toc nodes={toc}/>, document.getElementById('toc'))
})

/*
ipc.on('chapter', chapter => {
	window.chapter = chapter
	
	ReactDOM.render(<Chapter chapter={chapter}/>, document.getElementById('main'))
})
*/

document.addEventListener('DOMContentLoaded', e => {
	ReactDOM.render(<Splash/>, document.getElementById('main'))
})