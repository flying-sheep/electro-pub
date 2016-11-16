import { createStore, applyMiddleware, compose, Store } from 'redux'
import {
    forwardToMain,    forwardToRenderer,
    replayActionMain, replayActionRenderer,
    triggerAlias,
} from 'electron-redux'

import rootReducer, { RootState } from './reducers'


export default function configureStore(initialState: RootState, scope: 'main' | 'renderer'): Store<RootState> {
    const middlewares = (scope === 'main') ? [
        triggerAlias,
        //...commonMiddlewares,
        forwardToRenderer,  // 
    ] : [
        forwardToMain,  // Has to be first
        //...commonMiddlewares,Has to be last
    ]
    
    const composeEnhancers = (global as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
    
    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)))

    const replayAction = scope === 'main' ? replayActionMain : replayActionRenderer
    replayAction(store)
    
    return store
}