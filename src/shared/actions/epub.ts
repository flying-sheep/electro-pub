import actionCreatorFactory, { ActionCreator } from 'redux-typescript-actions'

import { NavPoint, NavPointWithContent } from '../epub'

const actionCreator = actionCreatorFactory()

export const setPath = actionCreator<string>('EPUB_PATH')
export const setBook = actionCreator<NavPoint[]>('BOOK')
export const setChapter = actionCreator<NavPointWithContent>('CHAPTER')
