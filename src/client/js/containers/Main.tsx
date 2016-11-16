import * as React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect, MapStateToProps } from 'react-redux'

import { TOCNode, TOCNodeWithContent } from '../../../shared/epub'
import { setPath, setChapter } from '../../../shared/actions/epub'
import { RootState } from '../../../shared/reducers'

import Splash from '../components/Splash'
import Reader from '../components/Reader'

interface MainProps {
	toc?: TOCNode[]
	chapter?: TOCNodeWithContent
	setChapter: (toc: TOCNodeWithContent) => void
	setPath: (path: string) => void
}

class Main extends React.Component<MainProps, {}> {
	render() {
		const { toc, chapter, setPath, setChapter } = this.props
		if (toc === undefined || chapter === undefined) return <Splash setPath={setPath}/>
		return <Reader toc={toc} chapter={chapter} setChapter={setChapter}/>
	}
}

export default connect(({ epub }: RootState) => epub, { setPath, setChapter })(Main)
