import * as React from 'react'


export interface ChapterProps {
	chapter: string,
}

export default class Chapter extends React.Component<ChapterProps, {}> {
	static defaultProps = {
		chapter: null,
	}
	render() {
		return <webview src={this.props.chapter} />
	}
}
