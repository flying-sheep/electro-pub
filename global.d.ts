declare namespace NodeJS {
	interface ProcessVersions {
		electroPub: number,
	}
}

declare module 'electron-redux' {
	import { Store, Middleware, ActionCreator, Action } from 'redux'
	
	export const forwardToMain: Middleware
	export const forwardToRenderer: Middleware
	export const triggerAlias: Middleware
	
	interface AliasedAction {
		type: 'ALIASED',
		payload: any[],
		meta: { trigger: string },
	}
	
	export function createAliasedAction<A extends Action>(name: string, actionCreator: ActionCreator<A>): ActionCreator<AliasedAction>
	export function replayActionMain<S>(store: Store<S>): void
	export function replayActionRenderer<S>(store: Store<S>): void
	export function getInitialStateRenderer(): any
}

declare module 'bitbar-webpack-progress-plugin' {
	interface BitBarWebpackProgressPlugin { new (): BitBarWebpackProgressPlugin }
	const bitBarWebpackProgressPlugin: BitBarWebpackProgressPlugin
	export = bitBarWebpackProgressPlugin
}


declare module 'postcss-cssnext' {
	
}
