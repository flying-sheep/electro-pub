declare namespace NodeJS {
    interface ProcessVersions {
        electroPub: number,
    }
}

declare namespace JSX {
    interface IntrinsicElements {
        webview: { src: string },
    }
}

declare module 'bitbar-webpack-progress-plugin' {
    interface BitBarWebpackProgressPlugin { new (): BitBarWebpackProgressPlugin }
    const bitBarWebpackProgressPlugin: BitBarWebpackProgressPlugin
    export = bitBarWebpackProgressPlugin
}


declare module 'postcss-cssnext' {
    
}

declare module 'autoprefixer' {
    function autoprefixer(options?: any): any;
    namespace autoprefixer {}
    export = autoprefixer
}
