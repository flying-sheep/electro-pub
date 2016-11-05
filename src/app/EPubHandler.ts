import { protocol } from 'electron'

import EPub from './epub'


export const SCHEME = 'epub'

export default class EPubHandler {
	constructor(readonly epub: EPub) {}
	
	handleRequest(request: Electron.ProtocolRequest, callback: Function) {
		const path = request.url.substr(SCHEME.length + 1)
		const item = this.epub.manifest[path]
		callback({
			data: item.data.toString(),
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
		protocol.registerStringProtocol(SCHEME, this.handleRequest.bind(this))
	}
}