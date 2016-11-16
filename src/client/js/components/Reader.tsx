import * as React from 'react'

import { EPubHandler } from '../../../app/handlers'
import { TOCNode, TOCNodeWithContent } from '../../../shared/epub'

import Toc from './Toc'
import Chapter from './Chapter'

export interface ReaderProps {
	toc: TOCNode[]
	chapter: TOCNodeWithContent
	setChapter: (toc: TOCNodeWithContent) => void
}

export default class Reader extends React.Component<ReaderProps, {}> {
	render() {
		const { toc, chapter, setChapter } = this.props
		if (toc === null) return null
		return (
            <div className="flex-transparent">
                <nav><Toc nodes={toc} onNodeClick={setChapter}/></nav>
                <Chapter chapter={`${EPubHandler.prefix}/${chapter.href}`}/>
            </div>
        )
	}
}