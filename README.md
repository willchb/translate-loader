[![npm][npm]][npm-url]
[![node][node]][node-url]

# Translate Loader for Webpack

The `translate-loader` is especially useful if you use webpack and need to support multi language.

With `translate-loader` modules are imported/required from different locations depending on the locale.

For example, if you write `import texts from './text_nls'`, `texts` will have the content of `./fr/text_nls`, if the locale is `'fr'`.

Preferrable, the locale should be defined as global variable named `locale`.
If that variable is not defined, `translate-loader` falls back to `navigator.language` or `navigator.userLanguage`.

It's also possible, by setting the option `returnFunction` to `true`, to ask `translate-loader` to return a function that you could then call passing the locale as argument. 

## Install

```shell
npm install --save-dev translate-loader
```

## Usage

### Hello World Example

**helloworld.js**
```js
import labels from "./nls/labels_nls.json";
import strings from "./nls/strings_nls";

console.debug(`${labels.helloWorld} (${labels.localeName}). ${strings.textFromJsModule}.`);
```

**nls/labels_nls.json**
```json
{
  "localeName": "Default",
  "helloWorld": "Hello World"
}
```

**nls/strings_nls.js**
```js
export default {
  textFromJsModule: "Text from a JS Module"
};
```

**nls/en/labels_nls.json**
```json
{
  "localeName": "English",
  "helloWorld": "Hello World"
}
```

**nls/en-US/labels_nls.json**
```json
{
  "localeName": "English US",
  "helloWorld": "Hello World"
}
```

**nls/es/labels_nls.json**
```json
{
  "localeName": "Español",
  "helloWorld": "Hola Mundo"
}
```

**nls/pt/labels_nls.json**
```json
{
  "localeName": "Português",
  "helloWorld": "Olá Mundo"
}
```

**nls/pt/strings_nls.js**
```js
export default {
  textFromJsModule: "Texto de um módulo JS"
};
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [{
      test: /_nls\.js(on)?$/,
      use: "translate-loader?locales=en;en-US;es;pt"
    }]
  }
};
```

or

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [{
      test: /_nls\.js(on)?$/,
      use: {
        loader: "translate-loader",
        options: {
          locales: [ "en", "en-US", "es", "pt" ]
        }
      }
    }]
  }
};
```

### Multiple locales at the same time

**helloworld.js**
```js
import strings from "./nls/strings_nls";

const stringsPt = strings('pt');
const stringsEn = strings('en');

console.debug(`This is Portuguese: ${stringsPt.helloWorld}.`);
console.debug(`This is English: ${stringsEn.helloWorld}.`);
```

**nls/strings_nls.json**
```json
{
  "helloWorld": "Hello World"
}
```

**nls/en/strings_nls.json**
```json
{
  "helloWorld": "Hello World"
}
```

**nls/pt/strings_nls.json**
```json
{
  "helloWorld": "Olá Mundo"
}
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [{
      test: /_nls\.js(on)?$/,
      use: {
        loader: "translate-loader",
        options: {
          locales: [ "en", "pt" ],
          returnFunction: true,
        }
      }
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
