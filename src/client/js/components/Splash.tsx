import { ipcRenderer } from 'electron'

import * as React from 'react'
import * as Dropzone from 'react-dropzone'

export default class Splash extends React.Component<{}, {}> {
	static onDrop(files: File[]) {
		ipcRenderer.send('open', files[0].path)
	}
	render() {
		return (
            <Dropzone onDrop={Splash.onDrop} multiple={false} className="drop-zone" activeClassName="active">
                Drop an .epub file here<br/>
                or click to select one
            </Dropzone>
		)
	}
}