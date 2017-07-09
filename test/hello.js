/* eslint-disable */
const assert = require("assert");
const path = require("path");
const translateLoader = require("../index");
const helloNLS = require("./nls/hello_nls.json");

const allHelloNLS = {
    "root": helloNLS,
    "en": require("./nls/en/hello_nls.json"),
    "en-US": require("./nls/en-US/hello_nls.json"),
    "fr": require("./nls/fr/hello_nls.json"),
};

describe("hello", function() {
    const mod = { };
    const context = {
        query: "?locales[]=en&locales[]=en-US&locales[]=fr",
        resourcePath: path.resolve(__dirname, "nls", "hello_nls.json"),
        addDependency: function () { },
    };
    const source = JSON.stringify(helloNLS);
    const body = translateLoader.call(context, source);
    const def = new Function("module", body);

    beforeEach(function() {
        delete mod.exports;
    });

    it("should return default", function() {
        locale = "pt";
        def.call({ }, mod);
        assert.equal(JSON.stringify(mod.exports), JSON.stringify(allHelloNLS.root));
    });

    it("should return english", function() {
        locale = "en";
        def.call({ }, mod);
        assert.equal(JSON.stringify(mod.exports), JSON.stringify(allHelloNLS.en));
    });

    it("should still return english", function() {
        locale = "en-IN";
        def.call({ }, mod);
        assert.equal(JSON.stringify(mod.exports), JSON.stringify(allHelloNLS.en));
    });

    it("should return american english", function() {
        locale = "en-US";
        def.call({ }, mod);
        assert.equal(JSON.stringify(mod.exports), JSON.stringify(allHelloNLS["en-US"]));
    });

    it("should return french", function() {
        locale = "fr";
        def.call({ }, mod);
        assert.equal(JSON.stringify(mod.exports), JSON.stringify(allHelloNLS.fr));
    });
});
