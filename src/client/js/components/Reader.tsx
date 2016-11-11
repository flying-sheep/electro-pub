import { TableOfContents } from '../../../app/epub'
import { EPubHandler } from '../../../app/handlers'

import * as React from 'react'

import Toc from './Toc'
import Chapter from './Chapter'

export interface ReaderProps {
	toc: TableOfContents[]
	chapter: TableOfContents
	loadChapter: (toc: TableOfContents) => void
}

export default class Reader extends React.Component<ReaderProps, {}> {
	render() {
		const { toc, chapter, loadChapter } = this.props
		if (toc === null) return null
		return (
            <div className="flex-transparent">
                <nav><Toc nodes={toc} onNodeClick={loadChapter}/></nav>
                <Chapter chapter={`${EPubHandler.prefix}/${chapter.href}`}/>
            </div>
        )
	}
}