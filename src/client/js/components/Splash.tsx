import * as React from 'react'
import * as Dropzone from 'react-dropzone'

interface SplashProps {
	setPath: (path: string) => void
}

export default class Splash extends React.Component<SplashProps, {}> {
	onDrop = (files: File[]) => {
		this.props.setPath(files[0].path)
	}
	render() {
		return (
            <Dropzone onDrop={this.onDrop} multiple={false} className="drop-zone" activeClassName="active">
                Drop an .epub file here<br/>
                or click to select one
            </Dropzone>
		)
	}
}