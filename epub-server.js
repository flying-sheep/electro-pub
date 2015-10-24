import http from 'http'

export default class EpubServer {
	constructor(epub, port = 37065) {
		this.epub = epub
		this.port = port
		this.server = http.createServer(this.handleRequest.bind(this))
	}
	
	handleRequest(request, response) {
		console.log(request.url)
		response.end(this.epub.manifest[request.url])
	}
	
	listen() {
		this.server.listen(PORT, () => {
			console.log(`Server listening on: http://localhost:${this.port}`)
		})
	}
}