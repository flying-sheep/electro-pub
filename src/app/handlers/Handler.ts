import { protocol } from 'electron'

export default class Handler {
    static SCHEME: string;
    
    static get prefix(): string {
        return `${this.SCHEME}://local`
    }
    
    handleRequest: Electron.BufferProtocolHandler
	
    get scheme(): string {
        return (this.constructor as typeof Handler).SCHEME
    }
	
	getPath(url: string) {
		const { prefix } = this.constructor as typeof Handler
		return url.substr(prefix.length + 1).replace(/\+$/, '')
	}

	register() {
		protocol.isProtocolHandled(this.scheme, (handled) => {
			if (handled) protocol.unregisterProtocol(this.scheme, () => this.registerOnly())
			else this.registerOnly()
		})
	}

	registerOnly() {
		protocol.registerBufferProtocol(this.scheme, this.handleRequest)
	}
}
