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

const helloNLS = require("./nls/hello_nls.json");

const allHelloNLS = {
    "root": require("!!json-loader!./nls/hello_nls.json"),
    "en": require("!!json-loader!./nls/en/hello_nls.json"),
    "en-US": require("!!json-loader!./nls/en-US/hello_nls.json"),
    "fr": require("!!json-loader!./nls/fr/hello_nls.json"),
};

describe(`hello ${locale} webpack`, function() {
    const expected = allHelloNLS[locale] || allHelloNLS[locale.substr(0, 2)] || allHelloNLS["root"];
    const actual = helloNLS;
    const testName = expected === allHelloNLS["root"] ? "should return default" : `should return ${locale}`;

    it(testName, function() {
        assert.deepStrictEqual(actual, expected);
    });
});
