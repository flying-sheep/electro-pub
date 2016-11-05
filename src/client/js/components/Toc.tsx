import { TableOfContents } from '../../../app/epub'

import * as React from 'react'

import TocNode from './TocNode'


interface TocProps {
	nodes: TableOfContents[],
	onNodeClick: Function,
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
