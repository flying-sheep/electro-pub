import { join, dirname } from 'path'
import { fs } from 'mz'

import * as AdmZip from 'adm-zip'
import { parseString } from 'xml2js'

import {
	ContainerNode,
	PackageNode, ItemNode,
	NCXNode, NavPointNode,
} from './node-types'
import NavPoint from './NavPoint'
import Manifest, { Item } from './Manifest'


const EPUB_MIME = 'application/epub+zip'
const PACKAGE_MIME = 'application/oebps-package+xml'


function parseXML<R>(str: string): Promise<R> {
	return new Promise((resolve, reject) => {
		parseString(str, { explicitRoot: false }, (e, r) => {
			if (e) reject(e)
			else resolve(r)
		})
	})
}


export class EPubError extends Error {}


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
		readonly manifest: Manifest,
		readonly spine: string[],
		readonly toc: NavPoint[],
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
		
		const container = await parseXML<ContainerNode>(getStr('META-INF/container.xml'))
		
		const rootfiles = container.rootfiles[0].rootfile
		const packageNode = rootfiles.filter(root => root.$['media-type'] === PACKAGE_MIME)[0]
		const entryPath = packageNode.$['full-path']
		const dir = dirname(entryPath)
		
		const pkg = await parseXML<PackageNode>(getStr(entryPath))
		
		const getItemData = (itemNode: ItemNode) => zip.getEntry(join(dir, itemNode.$.href)).getData()
		const { manifest, id2item } = Manifest.fromItems(pkg.manifest[0].item, getItemData)
		
		const spineNode = pkg.spine[0]
		const spine = spineNode.itemref.map(i => id2item[i.$.idref].href)
		
		const ncx = await parseXML<NCXNode>(id2item[spineNode.$.toc].data.toString('utf8'))
		const toc = NavPoint.fromNodes(ncx.navMap[0].navPoint)
		
		return new EPub(manifest, spine, toc)
	}
}
