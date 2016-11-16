import { TOCNode } from '../../../shared/epub'

import * as React from 'react'

import TocNode, { TocNodeClickHandler } from './TocNode'


export interface TocProps {
	nodes: TOCNode[],
	onNodeClick: TocNodeClickHandler,
}

export default class Toc extends React.Component<TocProps, {}> {
	static defaultProps = {
		nodes: [],
		onNodeClick: () => {},
	}
	render(): JSX.Element {
		const { nodes, onNodeClick } = this.props
		return (
			<ul>
				{ nodes.map(toc => <TocNode toc={toc} onNodeClick={onNodeClick} key={toc.label}/>) }
			</ul>
		)
	}
}
