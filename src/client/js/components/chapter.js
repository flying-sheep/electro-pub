import React from 'react'

export default class Chapter extends React.Component {
	static defaultProps = {
		chapter: null
	}
	render() {
		return <webview src={this.props.chapter}/>
	}
}
