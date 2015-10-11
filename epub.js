import { join, dirname } from 'path'
import fs from 'fs'

import AdmZip from 'adm-zip'
import { parseString } from 'xml2js'


const EPUB_MIME = 'application/epub+zip'
const PACKAGE_MIME = 'application/oebps-package+xml'


const parseXML = (str) =>
	new Promise((resolve, reject) => {
		parseString(str, { explicitRoot: false }, (e, r) => {
			if (e) reject(e)
			else  resolve(r)
		})
	})


export class EPubError extends Error {}


/**
 * @param href  relative path from the root to the item, e.g. 'Text/018.html'
 * @param mime  Media (or mime) type of the data
 * @param data  Buffer with the item data
 */
export class Item {
	constructor(href, mime, data) {
		this.href = href
		this.mime = mime
		this.data = data
	}
}


/**
 * @param label  Name of this part, chapter or other item
 * @param href   (Optional) href to a document
 * @param sub    (Optional) Array of sub-toc objects
 */
export class TableOfContents {
	constructor(label, href, sub) {
		this.label = label
		if (href != null)
			this.href = href
		if (sub != null)
			this.sub = sub
	}
	
	/**
	 * Recursive function to convert an array of navPoints to a toc hierarchy
	 * 
	 * @param navPoints  \package xml2js array of \c <navPoint/> nodes
	 * @return           Table of contents (\link Toc) object
	 */
	static fromNavPoints(navPoints) {
		if (navPoints == null)
			return null
		return navPoints.map(navPoint => new TableOfContents(
			navPoint.navLabel[0].text[0],
			navPoint.content[0].$.src,
			TableOfContents.fromNavPoints(navPoint.navPoint)))
	}
}


/**
 * Representation of an EPub document containing all relevant data to render it.
 * 
 * This includes a manifest
 * 
 * @param manifest  Object mapping hrefs to \link Item objects
 * @param spine     Array containing all chapter manifest hrefs in page turn order
 * @param toc       \link TableOfContents object
 */
export default class EPub {
	constructor(manifest, spine, toc) {
		this.manifest = manifest
		this.spine = spine
		this.toc = toc
	}
	
	/**
	 * Read an \link EPub object from a file path.
	 * 
	 * @param path  File path to an EPub document
	 * @return      Promise that resolves to an \link EPub object
	 */
	static read(path) {
		if (path == null)
			throw new EPubError('‘path’ needs to be a file path string, not null/undefined')
		
		try {
			fs.accessSync(path, fs.R_OK)
		} catch (e) {
			throw new EPubError(`The given path ‘${path}’ is not readable: ${e.code}`)
		}
		
		const zip = new AdmZip(path)
		const getStr = name => zip.getEntry(name).getData().toString('utf8')
		
		const mime = getStr('mimetype').trim()
		if (mime !== EPUB_MIME)
			throw new EPubError(`mimetype entry is ‘${mime}’ instead of ‘${EPUB_MIME}’`)
		
		let dir = null
		let manifest = null
		let spine = null
		
		return parseXML(getStr('META-INF/container.xml'))
			.then(container => {
				const rootfiles = container.rootfiles[0].rootfile
				const packageNode = rootfiles.filter(root => root.$['media-type'] === PACKAGE_MIME)[0]
				const path = packageNode.$['full-path']
				dir = dirname(path)
				return parseXML(getStr(path))
			}).then(pkg => {
				//also available here: guide, metadata
				
				//TODO: use manifest to allow links
				const id2item = {}
				manifest = {}
				for (let itemNode of pkg.manifest[0].item) {
					let data = zip.getEntry(join(dir, itemNode.$.href)).getData()
					let item = new Item(itemNode.$.href, itemNode.$['media-type'], data)
					
					id2item[itemNode.$.id] = item
					manifest[item.href] = item
				}
				
				const spineNode = pkg.spine[0]
				spine = spineNode.itemref.map(i => id2item[i.$.idref].href)
				
				return parseXML(id2item[spineNode.$.toc].data.toString('utf8'))
			}).then(ncx => {
				const toc = TableOfContents.fromNavPoints(ncx.navMap[0].navPoint)
				
				return new EPub(manifest, spine, toc)
			})
	}
}
