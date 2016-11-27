import { NavPointNode } from './node-types'

/**
 * @param label  Name of this part, chapter or other item
 * @param href   (Optional) href to a document
 * @param sub    (Optional) Array of sub-toc objects
 */
export default class NavPoint {
	readonly label: string
	readonly href?: string
	readonly sub?: NavPoint[]
	
	constructor(label: string, href?: string, sub?: NavPoint[]) {
		this.label = label
		if (href !== undefined) this.href = href
		if (sub !== undefined) this.sub = sub 	
	}
	
	/**
	 * Recursive function to convert an array of navPoints to a toc hierarchy
	 *
	 * @param navPoints  \package xml2js array of \c <navPoint/> nodes
	 * @return           Table of contents (\link Toc) object
	 */
	static fromNodes(navPointNodes: NavPointNode[]): NavPoint[] {
		return navPointNodes.map(({ navLabel, content, navPoint }) => new NavPoint(
			navLabel[0].text[0],
			content[0].$.src,
			navPoint ? NavPoint.fromNodes(navPoint) : undefined))
	}
	
	static firstWithContent(toc: NavPoint[]): NavPointWithContent | null {
		for (const node of toc) {
			if (node.href) {
				return node as NavPointWithContent
			} else if (node.sub) {
				const sub = NavPoint.firstWithContent(node.sub)
				if (sub) return sub
			}
		}
		return null
	}
}

export interface NavPointWithContent extends NavPoint {
	readonly href: string
}
