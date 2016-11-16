import '../style.css'

import { ipcRenderer } from 'electron'

import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { getInitialStateRenderer } from 'electron-redux'

import { TOCNode } from '../../shared/epub'
import configureStore from '../../shared/store'

import Main from './containers/Main'

const store = configureStore(getInitialStateRenderer(), 'renderer')

document.addEventListener('DOMContentLoaded', () => {
	render(<Provider store={store}><Main/></Provider>, document.getElementById('mount'))
})
