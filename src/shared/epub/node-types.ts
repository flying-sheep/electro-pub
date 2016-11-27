// container

export interface ContainerNode {
	rootfiles: [RootFilesNode]
}

export interface RootFilesNode {
	rootfile: RootFileNode[]
}

export interface RootFileNode {
	$: {
		'media-type': string
		'full-path': string
	}
}

// package

export interface PackageNode {
	metadata: [{ [nodeType: string]: any }]
	manifest: [ManifestNode]
	spine: [SpineNode]
}

export interface ManifestNode {
	item: ItemNode[]
}

export interface ItemNode {
	$: {
		id: string
		href: string 
		'media-type': string
	}
}

export interface SpineNode {
	$: { toc: string }
	itemref: ItemRefNode[]
}

export interface ItemRefNode {
	$: { idref: string }
}

// ncx (navigation control)

export interface NCXNode {
	navMap: [NavMapNode]
}

export interface NavMapNode {
	navPoint: NavPointNode[]
}

export interface NavPointNode {
	navLabel: [NavLabelNode]
	content: [ContentNode]
	navPoint?: NavPointNode[]
}

export interface NavLabelNode {
	text: [string]
}

export interface ContentNode {
	$: { src: string }
}
