import { fs } from 'mz'

import Handler from './Handler'

export default class AssetHandler extends Handler {
	static SCHEME = 'asset'
	
	handleRequest: Electron.FileProtocolHandler = (request: Electron.ProtocolRequest, callback: Electron.FileProtocolCallback) => {
		callback(`${__dirname}/${this.getPath(request.url)}`)
	}
}
