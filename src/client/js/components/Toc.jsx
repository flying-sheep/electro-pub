import React from 'react'

import TocNode, { TocType } from './TocNode'


export default class Toc extends React.Component {
	static propTypes = {
		nodes: React.PropTypes.arrayOf(TocType).isRequired,
		onNodeClick: React.PropTypes.func.isRequired,
	}
	static defaultProps = {
		nodes: [],
		onNodeClick: () => {},
	}
	render() {
		const { nodes, onNodeClick } = this.props
		return (
			<ul>
				{ nodes.map(toc => <TocNode toc={toc} onNodeClick={onNodeClick} key={toc.label}/>) }
			</ul>
		)
	}
}
