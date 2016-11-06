ElectroPub
==========

A (at the moment rudimentary) [EPub][] reader based on [Electron][].

[EPub]: http://idpf.org/epub
[Electron]: http://electron.atom.io


Usage
-----

```console
$ electron . [book.epub]
```

From inside the project directory. (or specify that directory instead of `.`)


Hacking
-------

This project is written in [Typescript][] and built via [Webpack][].

To get started:

```console
$ npm install
$ npm run build
```

For development, just run `webpack --watch` or

```sh
$ npm run watch
```

and `electron .` (from the project directory)

[Typescript]: http://www.typescriptlang.org
[Webpack]: https://webpack.github.io


### Tool integration

There is a VS Code debug configuration (`.vscode/launch.json`) that works for the client-side code. You can also adapt it to attach other IDEs to Electron’s debugger.

Further we employ a [Webpack progress plugin][] that integrates with the [Bitbar][] for OSX and the [Webpack Progress][] VS Code addon.

[Webpack progress plugin]: https://github.com/wk-j/bitbar-webpack-progress-plugin#readme
[Bitbar]: https://getbitbar.com
[Webpack Progress]: https://marketplace.visualstudio.com/items?itemName=wk-j.webpack-progress
