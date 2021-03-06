import EPub from '../../shared/epub'

import Handler from './Handler'

export default class EPubHandler extends Handler {
	static SCHEME = 'epub'
	
	constructor(readonly epub: EPub) { super() }
	
	handleRequest: Electron.BufferProtocolHandler = (request: Electron.ProtocolRequest, callback: Electron.BufferProtocolCallback) => {
		const path = this.getPath(request.url)
		const { data, mime } = this.epub.manifest[path]
		callback({ data, mimeType: mime })
	}
}
