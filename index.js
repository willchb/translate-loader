const fs = require("fs");
const path = require("path");

function parseQuery(query) {
    const paramsArray = query.substr(1).split("&");
    const params = { };

    for (const param of paramsArray) {
        const equalPos = param.indexOf("=");

        if (equalPos >= 0) {
            params[param.substr(0, equalPos)] = param.substr(equalPos + 1);
        } else {
            params[param] = null;
        }
    }
    return params;
}

module.exports = function translateLoader(source) {
    const query = parseQuery(this.query);
    const dirname = path.dirname(this.resourcePath);
    const basename = path.basename(this.resourcePath);
    const translations = { root: JSON.parse(source) };

    if (typeof query.locales === "string") {
        query.locales = query.locales.split(",");
    }

    for (const locale of query.locales) {
        const resourcePath = path.resolve(dirname, locale, basename);

        if (fs.existsSync(resourcePath)) {
            translations[locale] = JSON.parse(fs.readFileSync(resourcePath));
        }
    }

    return `var translations = ${JSON.stringify(translations)};
var env = typeof window !== "undefined" ? "browser" : "node";
var loc = env === "browser" && (window.locale || navigator.language || navigator.userLanguage) || global.locale;
var translation = loc && (translations[loc] || translations[loc.substr(0, 2)]) || translations["root"];
module.exports = translation;`;
};
