declare namespace NodeJS {
    interface ProcessVersions {
        electroPub: number,
    }
}

declare module 'react-electron-webview' {
    interface WebViewProps extends React.HTMLProps<Electron.WebViewElement> {
        src: string
        
        autosize?: boolean
        disablewebsecurity?: boolean
        httpreferrer?: string
        nodeintegration?: boolean
        plugins?: boolean
        preload?: string
        useragent?: string
        partition?: string
        allowpopups?: boolean
        webpreferences?: string
        blinkfeatures?: string
        disableblinkfeatures?: string
        guestinstance?: string
        
        loadCommit?: EventListener
        didFinishLoad?: EventListener
        didFailLoad?: EventListener
        didFrameFinishLoad?: EventListener
        didStartLoading?: EventListener
        didStopLoading?: EventListener
        didGetResponseDetails?: EventListener
        didGetRedirectRequest?: EventListener
        domReady?: EventListener
        pageTitleSet?: EventListener
        pageFaviconUpdated?: EventListener
        enterHtmlFullScreen?: EventListener
        leaveHtmlFullScreen?: EventListener
        consoleMessage?: EventListener
        newWindow?: EventListener
        close?: EventListener
        ipcMessage?: EventListener
        crashed?: EventListener
        gpuCrashed?: EventListener
        pluginCrashed?: EventListener
        destroyed?: EventListener
    }
    interface WebViewState {
        loaded: boolean
        webview: Electron.WebViewElement
    }
    export default class WebView extends React.Component<WebViewProps, WebViewState> {}  
}

declare module 'bitbar-webpack-progress-plugin' {
    interface BitBarWebpackProgressPlugin { new (): BitBarWebpackProgressPlugin }
    const bitBarWebpackProgressPlugin: BitBarWebpackProgressPlugin
    export = bitBarWebpackProgressPlugin
}


declare module 'postcss-cssnext' {
    
}
