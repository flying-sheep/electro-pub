import actionCreatorFactory, { ActionCreator } from 'redux-typescript-actions'

import { TOCNode, TOCNodeWithContent } from '../epub'

const actionCreator = actionCreatorFactory()

export const setPath = actionCreator<string>('EPUB_PATH')
export const setBook = actionCreator<TOCNode[]>('BOOK')
export const setChapter = actionCreator<TOCNodeWithContent>('CHAPTER')
