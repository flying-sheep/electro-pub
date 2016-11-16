import { Action } from 'redux'

import { TOCNode, TOCNodeWithContent } from '../epub'


export const SET_PATH = 'EPUB_PATH'
export const SET_TOC = 'TOC'
export const SET_CHAPTER = 'CHAPTER'

export interface PathAction { type: 'EPUB_PATH', payload: string }
export function setPath(path: string): PathAction {
  return { type: SET_PATH, payload: path }
}

export interface TOCAction { type: 'TOC', payload: TOCNode[] }
export function setTOC(toc: TOCNode[]): TOCAction {
  return { type: SET_TOC, payload: toc }
}

export interface ChapterAction { type: 'CHAPTER', payload: TOCNodeWithContent }
export function setChapter(chapter: TOCNodeWithContent): ChapterAction {
  return { type: SET_CHAPTER, payload: chapter }
}

export type EPubAction = PathAction | TOCAction | ChapterAction
