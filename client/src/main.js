'use strict'

import remote from 'remote'
import ipc from 'ipc'
import React from 'react'
import ReactDOM from 'react-dom'

class Toc extends React.Component {
	render() {
		return <ul>
			{ this.props.nodes.map(toc => <TocNode toc={toc}/>) }
		</ul>
	}
}
Toc.defaultProps = {
	nodes: []
}

class TocNode extends React.Component {
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

ipc.on('toc', function(toc) {
	window.toc = toc
	
	ReactDOM.render(<Toc nodes={toc}/>, document.getElementById('toc'))
})