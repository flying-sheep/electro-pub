import React from 'react'

import Toc from './Toc'


export const TocType = React.PropTypes.shape({
	label: React.PropTypes.string.isRequired,
	sub: React.PropTypes.arrayOf(LazyTocType), // eslint-disable-line no-use-before-define
})
function LazyTocType(...args) { return TocType.apply(this, args) }


export default function TocNode({ toc }) {
	return (
		<li>
			<header>{ toc.label }</header>
			{ (toc.sub) ? <Toc nodes={toc.sub}/> : null }
		</li>
	)
}
TocNode.propTypes = {
	toc: TocType.isRequired,
}
