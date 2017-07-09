const fs = require("fs");
const loaderUtils = require("loader-utils");
const path = require("path");

module.exports = function translateLoader(source) {
    const options = loaderUtils.getOptions(this);
    const dirname = path.dirname(this.resourcePath);
    const basename = path.basename(this.resourcePath);
    const translations = { root: JSON.parse(source) };

    if (this.cacheable) {
        this.cacheable();
    }

    if (typeof options.locales === "string") {
        options.locales = options.locales.split(/[ ,;|]/g);
    }

    for (const locale of options.locales) {
        const resourcePath = path.resolve(dirname, locale, basename);

        if (fs.existsSync(resourcePath)) {
            this.addDependency(resourcePath);
            translations[locale] = JSON.parse(fs.readFileSync(resourcePath));
        }
    }

    return `
var translations = ${JSON.stringify(translations)};
var env = typeof window !== "undefined" ? "browser" : "node";
var loc = env === "browser" && (window.locale || navigator.language || navigator.userLanguage) || global.locale;
var translation = loc && (translations[loc] || translations[loc.substr(0, 2)]) || translations["root"];
module.exports = translation;`;
};
