import { TOCNode, TOCNodeWithContent } from '../epub'

import { SET_PATH, SET_TOC, SET_CHAPTER, EPubAction } from '../actions/epub'

export interface PathEPubState {
	path: string
}
export interface LoadedEPubState extends PathEPubState {
	toc: TOCNode[]
	chapter: TOCNodeWithContent
}
export type EPubState = {} | PathEPubState | LoadedEPubState
const initialState: EPubState = {}

export function isPathSet(state: EPubState): state is PathEPubState {
	return (state as PathEPubState).path !== undefined
}
export function isLoaded(state: EPubState): state is LoadedEPubState {
	return (state as LoadedEPubState).toc !== undefined
}

export default function epub(state: EPubState = initialState, action: EPubAction): EPubState {
	switch (action.type) {
		case SET_PATH: {
			return { path: action.payload }
		}
		case SET_TOC: {
			if (!isPathSet(state)) throw new Error(`Action “${SET_TOC}” dispatched while no path is available`)
			const toc = action.payload
			const chapter = TOCNode.firstWithContent(toc)
			if (chapter) {
				return Object.assign({}, state, { toc, chapter })
			} else {
				throw new Error('EBook has no chapters with content?')
			}
		}
		case SET_CHAPTER: {
			if (!isLoaded(state)) throw new Error(`Action “${SET_CHAPTER}” dispatched while no toc is available`)
			return Object.assign({}, state, { chapter: action.payload })
		}
	}
	return initialState
}
