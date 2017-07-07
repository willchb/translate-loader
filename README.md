[![npm][npm]][npm-url]
[![node][node]][node-url]

# Translate Loader for Webpack

## Install

```shell
npm install --save-dev translate-loader
```

## Usage

The `translate-loader` enables you to import/require translation modules that are "aliased"
during runtime to specific files, based on browser's locale.

**helloworld.js**
```js
import labels from "labels_nls.json";

console.debug(`${labels.helloWorld} (${labels.localeName})`);
```

**labels_nls.json**
```json
{
    "localeName": "Default",
    "helloWorld": "Hello World"
}
```

**en/labels_nls.json**
```json
{
    "localeName": "English",
    "helloWorld": "Hello World"
}
```

**en-US/labels_nls.json**
```json
{
    "localeName": "English US",
    "helloWorld": "Hello World"
}
```

**es/labels_nls.json**
```json
{
    "localeName": "Español",
    "helloWorld": "Hola Mundo"
}
```

**pt/labels_nls.json**
```json
{
    "localeName": "Português",
    "helloWorld": "Olá Mundo"
}
```

**webpack.config.js**
```js
module.exports = {
    module: {
        rules: [{
            test: /_nls\.json$/,
            use: "translate-loader?locales=en,en-US,es,pt"
        }]
    }
};
```

## Maintainers

| [![willchb-avatar]][willchb] |
|------------------------------|
| [Willian Balmant]([willchb]) |


[npm]: https://img.shields.io/npm/v/translate-loader.svg
[npm-url]: https://npmjs.com/package/translate-loader

[node]: https://img.shields.io/node/v/translate-loader.svg
[node-url]: https://nodejs.org

[willchb]: https://github.com/willchb
[willchb-avatar]: https://avatars1.githubusercontent.com/u/16672319?v=3&s=150
