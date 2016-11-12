import '../style.css'
import { TableOfContents } from '../../app/epub'

import { ipcRenderer } from 'electron'

import * as React from 'react'
import { render } from 'react-dom'

import Splash from './components/Splash'
import Reader from './components/Reader'

interface MainStateLoaded {
	toc: TableOfContents[]
	chapter: TableOfContents
}

class Main extends React.Component<{}, MainStateLoaded | null> {
	constructor() {
		super()
		this.state = null
		ipcRenderer.on('toc', (e, toc: TableOfContents[]) => {
			this.setState({ toc, chapter: toc[0] })
		})
	}
	loadChapter = (chapter: TableOfContents) => {
		this.setState(({ toc }: MainStateLoaded) => ({ toc, chapter }))
	}
	render() {
		if (this.state === null) return <Splash/>
		const { toc, chapter } = this.state
		return <Reader toc={toc} chapter={chapter} loadChapter={this.loadChapter}/>
	}
}

document.addEventListener('DOMContentLoaded', () => {
	render(<Main/>, document.getElementById('mount'))
})
