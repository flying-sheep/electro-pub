import { ItemNode } from './node-types'

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
	
	static fromNode(itemNode: ItemNode, data: Buffer): Item {
		return new Item(itemNode.$.href, itemNode.$['media-type'], data)
	}
}

export default class Manifest {
	[href: string]: Item
	
	static fromItems(items: ItemNode[], getItemData: (itemNode: ItemNode) => Buffer): { manifest: Manifest, id2item: { [idref: string]: Item } } {
		const manifest = new Manifest
		const id2item: { [idref: string]: Item } = {}
		for (const itemNode of items) {
			const data = getItemData(itemNode)
			const item = Item.fromNode(itemNode, data)
			
			id2item[itemNode.$.id] = item
			manifest[item.href] = item
		}
		return { manifest, id2item }
	}
}
