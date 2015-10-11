import React from 'react'

export default class Toc extends React.Component {
	render() {
		return <ul>
			{ this.props.nodes.map(toc => <TocNode toc={toc}/>) }
		</ul>
	}
}
Toc.defaultProps = {
	nodes: []
}

export class TocNode extends React.Component {
	render() {
		return <div>
			<header>{ this.props.toc.label }</header>
			{ (this.props.toc.sub) ? <Toc nodes={this.props.toc.sub}/> : null }
		</div>
	}
}
TocNode.defaultProps = {
	toc: []
}
