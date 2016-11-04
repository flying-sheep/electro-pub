import React from 'react'

import TocNode, { TocType } from './TocNode'


export default class Toc extends React.Component {
	static propTypes = {
		nodes: React.PropTypes.arrayOf(TocType).isRequired,
	}
	static defaultProps = {
		nodes: [],
	}
	render() {
		return (
			<ul>
				{ this.props.nodes.map(toc => <TocNode toc={toc} key={toc.label}/>) }
			</ul>
		)
	}
}
