import React from 'react'

export default class Chapter extends React.Component {
	render() {
		return <webview src={this.props.chapter}/>
	}
}
Chapter.defaultProps = {
	chapter: null
}
