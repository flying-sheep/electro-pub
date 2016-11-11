import * as React from 'react'
import WebView from 'react-electron-webview'

import { AssetHandler } from '../../../app/handlers' 

export interface ChapterProps {
	chapter: string,
}

export default class Chapter extends React.Component<ChapterProps, {}> {
	static defaultProps = {
		chapter: null,
	}
	insertStyle = (e: Event) => {
		const wvComponent = this.refs['webview'] as WebView
		for (const sheet of ['style.css', 'fonts.css']) {
			wvComponent.state.webview.executeJavaScript(`{
				const s = document.createElement('style')
				s.setAttribute('rel', 'stylesheet')
				s.setAttribute('href', '${AssetHandler.prefix}/${ sheet }')
				document.head.appendChild(s)
			}`)
		}
	}
	render() {
		return <WebView className="chapter" ref="webview" src={this.props.chapter} domReady={this.insertStyle}/>
	}
}
