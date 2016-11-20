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

	register(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			const registerAndResolve = () => this.registerOnly().then(resolve)
			protocol.isProtocolHandled(this.scheme, (handled) => {
				if (handled) protocol.unregisterProtocol(this.scheme, err => err ? reject(err) : registerAndResolve())
				else registerAndResolve()
			})
		})
	}

	registerOnly(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			protocol.registerBufferProtocol(this.scheme, this.handleRequest, err => err ? reject(err) : resolve())
		})
	}
}
