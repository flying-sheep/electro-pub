import { TableOfContents } from '../../../app/epub'

import * as React from 'react'

import Toc from './Toc'


interface TocNodeProps {
	toc: TableOfContents,
	onNodeClick: Function,
}

export default class TocNode extends React.Component<TocNodeProps, {}> {
	handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		this.props.onNodeClick(this.props.toc)
	}
	render() {
		const { toc, onNodeClick } = this.props
		return (
			<li>
				<a href={toc.href} onClick={this.handleClick}>{ toc.label }</a>
				{ (toc.sub) ? <Toc nodes={toc.sub} onNodeClick={onNodeClick}/> : null }
			</li>
		)
	}
}