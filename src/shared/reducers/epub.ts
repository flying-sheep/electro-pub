import { isType, Action } from 'redux-typescript-actions'

import { NavPoint, NavPointWithContent } from '../epub'

import { setPath, setBook, setChapter } from '../actions/epub'

export interface PathEPubState {
	path: string
}
export interface LoadedEPubState extends PathEPubState {
	toc: NavPoint[]
	chapter: NavPointWithContent
}
export type EPubState = {} | PathEPubState | LoadedEPubState

export function isPathSet(state: EPubState): state is PathEPubState {
	return (state as PathEPubState).path !== undefined
}
export function isLoaded(state: EPubState): state is LoadedEPubState {
	return (state as LoadedEPubState).toc !== undefined
}

export default function epub(state: EPubState = {}, action: Action<any>): EPubState {
	if (isType(action, setPath)) {
		return { path: action.payload }
	} else if (isType(action, setBook)) {
		if (!isPathSet(state)) throw new Error(`Action “${setBook}” dispatched while no path is available`)
		const toc = action.payload
		const chapter = NavPoint.firstWithContent(toc)
		if (chapter) {
			return Object.assign({}, state, { toc, chapter })  // TODO: spread in TS 2.1.3
		} else {
			throw new Error('EBook has no chapters with content?')
		}
	} else if (isType(action, setChapter)) {
		if (!isLoaded(state)) throw new Error(`Action “${setChapter}” dispatched while no toc is available`)
		return Object.assign({}, state, { chapter: action.payload })
	}
	return state
}
