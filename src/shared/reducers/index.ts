import { combineReducers, Reducer } from 'redux'

import epub, { EPubState } from './epub'

export interface RootState {
    epub: EPubState,
}

export default combineReducers<RootState>({
    epub
})
