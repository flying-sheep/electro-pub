import React from 'react'

export default class Toc extends React.Component {
	static defaultProps = {
		nodes: []
	}
	render() {
		return <ul>
			{ this.props.nodes.map(toc => <TocNode toc={toc} key={toc.label} />) }
		</ul>
	}
}

export class TocNode extends React.Component {
	static defaultProps = {
		toc: []
	}
	render() {
		return <div>
			<header>{ this.props.toc.label }</header>
			{ (this.props.toc.sub) ? <Toc nodes={this.props.toc.sub}/> : null }
		</div>
	}
}
