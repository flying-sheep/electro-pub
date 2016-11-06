import { protocol } from 'electron'

import EPub from './epub'


export const SCHEME = 'epub'

export default class EPubHandler {
	constructor(readonly epub: EPub) {}
	
	handleRequest: Electron.BufferProtocolHandler = (request: Electron.ProtocolRequest, callback: Electron.BufferProtocolCallback) => {
		const path = request.url.substr(SCHEME.length + 1)
		const item = this.epub.manifest[path]
		callback({
			data: item.data,
			mimeType: item.mime,
			charset: 'utf8',
		})
	}

	register() {
		protocol.isProtocolHandled(SCHEME, (handled) => {
			if (handled) protocol.unregisterProtocol(SCHEME, () => this.registerOnly())
			else this.registerOnly()
		})
	}

	registerOnly() {
		protocol.registerBufferProtocol(SCHEME, this.handleRequest)
	}
}
