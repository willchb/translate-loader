/* eslint-disable */

const assert = require("assert");
const { Console } = require("console");
const console = new Console(process.stdout, process.stderr);

locale = null;
for (let i = 2; !locale && i < process.argv.length; i++) {
    if (process.argv[i].startsWith("--locale=")) {
        locale = process.argv[i].substr("--locale=".length);
    }
}

const helloNLSJson = require("./nls/hello_nls.json");
const helloNLSJs = require("./nls/hello_nls");

const allHelloNLSJson = {
    "root": require("!!json-loader!./nls/hello_nls.json"),
    "en": require("!!json-loader!./nls/en/hello_nls.json"),
    "en-US": require("!!json-loader!./nls/en-US/hello_nls.json"),
    "fr": require("!!json-loader!./nls/fr/hello_nls.json"),
};
const allHelloNLSJs = {
    "root": require("./nls/hello_nls"),
    "en": require("./nls/en/hello_nls"),
    "en-US": require("./nls/en-US/hello_nls"),
    "fr": require("./nls/fr/hello_nls"),
};

describe(`hello ${locale} webpack json`, function() {
    const expected = allHelloNLSJson[locale] || allHelloNLSJson[locale.substr(0, 2)] || allHelloNLSJson["root"];
    const actual = helloNLSJson;
    const testName = expected === allHelloNLSJson["root"] ? "should return default" : `should return ${locale}`;

    it(testName, function() {
        assert.deepStrictEqual(actual, expected);
    });
});

describe(`hello ${locale} webpack js`, function() {
    const expected = allHelloNLSJs[locale] || allHelloNLSJs[locale.substr(0, 2)] || allHelloNLSJs["root"];
    const actual = helloNLSJs;
    const testName = expected === allHelloNLSJs["root"] ? "should return default" : `should return ${locale}`;

    it(testName, function() {
        assert.deepStrictEqual(actual, expected);
    });
});
