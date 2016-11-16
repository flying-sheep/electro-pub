import { join, dirname } from 'path'
import { fs } from 'mz'

import * as AdmZip from 'adm-zip'
import { parseString } from 'xml2js'


const EPUB_MIME = 'application/epub+zip'
const PACKAGE_MIME = 'application/oebps-package+xml'


function parseXML(str: string): Promise<any> {
	return new Promise((resolve, reject) => {
		parseString(str, { explicitRoot: false }, (e, r) => {
			if (e) reject(e)
			else resolve(r)
		})
	})
}


export class EPubError extends Error {}


/**
 * @param href  relative path from the root to the item, e.g. 'Text/018.html'
 * @param mime  Media (or mime) type of the data
 * @param data  Buffer with the item data
 */
export class Item {
	constructor(
		readonly href: string,
		readonly mime: string,
		readonly data: Buffer,
	) {}
}


/**
 * @param label  Name of this part, chapter or other item
 * @param href   (Optional) href to a document
 * @param sub    (Optional) Array of sub-toc objects
 */
export class TOCNode {
	readonly label: string
	readonly href?: string
	readonly sub?: TOCNode[]
	
	constructor(label: string, href?: string, sub?: TOCNode[] | null) {
		this.label = label
		if (href != null) this.href = href
		if (sub != null) this.sub = sub 	
	}
	
	/**
	 * Recursive function to convert an array of navPoints to a toc hierarchy
	 *
	 * @param navPoints  \package xml2js array of \c <navPoint/> nodes
	 * @return           Table of contents (\link Toc) object
	 */
	static fromNavPoints(navPoints: any[]): TOCNode[];
	static fromNavPoints(navPoints?: null): null;
	
	static fromNavPoints(navPoints?: any[] | null) {
		if (navPoints == null) return null
		return navPoints.map(navPoint => new TOCNode(
			navPoint.navLabel[0].text[0],
			navPoint.content[0].$.src,
			TOCNode.fromNavPoints(navPoint.navPoint)))
	}
	
	static firstWithContent(toc: TOCNode[]): TOCNodeWithContent | null {
		for (const node of toc) {
			if (node.href) {
				return node as TOCNodeWithContent
			} else if (node.sub) {
				const sub = TOCNode.firstWithContent(node.sub)
				if (sub) return sub
			}
		}
		return null
	}
}

export interface TOCNodeWithContent extends TOCNode {
	readonly href: string
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
	constructor(
		readonly manifest: { [href: string]: Item },
		readonly spine: string[],
		readonly toc: TOCNode[],
	) {}
	
	/**
	 * Read an \link EPub object from a file path.
	 *
	 * @param path  File path to an EPub document
	 * @return      Promise that resolves to an \link EPub object
	 */
	static async read(path: string) {
		try {
			await fs.access(path, fs.constants.R_OK)
		} catch (e) {
			throw new EPubError(`The given path ‘${path}’ is not readable: ${e.code}`)
		}
		
		const zip = new AdmZip(path)
		const getStr = (name: string) => zip.getEntry(name).getData().toString('utf8')
		
		const mime = getStr('mimetype').trim()
		if (mime !== EPUB_MIME) {
			throw new EPubError(`mimetype entry is ‘${mime}’ instead of ‘${EPUB_MIME}’`)
		}
		
		const container = await parseXML(getStr('META-INF/container.xml'))
		
		const rootfiles: any[] = container['rootfiles'][0].rootfile
		const packageNode = rootfiles.filter((root: any) => root.$['media-type'] === PACKAGE_MIME)[0]
		const entryPath = packageNode.$['full-path']
		const dir = dirname(entryPath)
		
		const pkg = await parseXML(getStr(entryPath))
		
		// also available here: guide, metadata
		
		// TODO: use manifest to allow links
		const id2item: { [id: string]: Item } = {}
		const manifest: { [href: string]: Item } = {}
		for (const itemNode of pkg['manifest'][0].item) {
			const data = zip.getEntry(join(dir, itemNode.$.href)).getData()
			const item = new Item(itemNode.$.href, itemNode.$['media-type'], data)
			
			id2item[itemNode.$.id] = item
			manifest[item.href] = item
		}
		
		const spineNode = pkg['spine'][0]
		const spine: string[] = spineNode.itemref.map((i: any) => id2item[i.$.idref].href)
		
		const ncx = await parseXML(id2item[spineNode.$.toc].data.toString('utf8'))
		const toc = TOCNode.fromNavPoints(ncx['navMap'][0].navPoint)
		
		return new EPub(manifest, spine, toc)
	}
}
