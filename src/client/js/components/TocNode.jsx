import React from 'react'

import Toc from './Toc'


export const TocType = React.PropTypes.shape({
	label: React.PropTypes.string.isRequired,
	sub: React.PropTypes.arrayOf(LazyTocType), // eslint-disable-line no-use-before-define
})
function LazyTocType(...args) { return TocType.apply(this, args) }


export default class TocNode extends React.Component {
	static propTypes = {
		toc: TocType.isRequired,
		onNodeClick: React.PropTypes.func.isRequired,
	}
	handleClick = (e) => {
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
