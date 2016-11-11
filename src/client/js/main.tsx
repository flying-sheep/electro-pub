import '../style.css'
import { TableOfContents } from '../../app/epub'
import { EPubHandler, AssetHandler } from '../../app/handlers'

import { ipcRenderer } from 'electron'

import * as React from 'react'
import { render } from 'react-dom'

import Splash from './components/Splash'
import Toc from './components/Toc'
import Chapter from './components/Chapter'

function renderChapter(toc: TableOfContents) {
	render(<Chapter chapter={`${EPubHandler.prefix}/${toc.href}`}/>, document.getElementById('main'))
}

ipcRenderer.on('toc', (e, toc) => {
	render(<Toc nodes={toc} onNodeClick={renderChapter}/>, document.getElementById('toc'))
})

document.addEventListener('DOMContentLoaded', () => {
	render(<Splash/>, document.getElementById('main'))
})
