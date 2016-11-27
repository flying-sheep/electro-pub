import { NavPoint } from '../../../shared/epub'

import * as React from 'react'

import Toc from './Toc'


export interface TocNodeClickHandler {
	(toc: NavPoint): void			
}

export interface TocNodeProps {
	toc: NavPoint,
	onNodeClick: TocNodeClickHandler,
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
