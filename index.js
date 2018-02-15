const fs = require("fs");
const loaderUtils = require("loader-utils");
const path = require("path");

module.exports = function translateLoader(source) {
  if (/[?&]raw=true/.test(this.resourceQuery)) {
    return source;
  }

  const options = loaderUtils.getOptions(this);
  const dirname = path.dirname(this.resourcePath);
  const basename = path.basename(this.resourcePath);
  const isJson = /\.json$/.test(basename);
  const requires = [ ];

  if (isJson) {
    requires.push(`root: ${JSON.stringify(JSON.parse(source))}`);
  } else {
    requires.push(`root: require("./${basename}?raw=true")`);
  }

  if (typeof options.locales === "string") {
    options.locales = options.locales.split(/[ ,;|]/g);
  }

  for (const locale of options.locales) {
    const resourcePath = path.resolve(dirname, locale, basename);

    if (fs.existsSync(resourcePath)) {
      this.addDependency(resourcePath);
      if (isJson) {
        requires.push(`"${locale}": ${JSON.stringify(JSON.parse(fs.readFileSync(resourcePath)))}`);
      } else {
        requires.push(`"${locale}": require("./${locale}/${basename}?raw=true")`);
      }
    }
  }

  if (options.returnFunction) {
    return `
var translations = { ${requires.join(",")} };
module.exports = function translate(locale) {
  return translations[locale] || translations[locale.substr(0, 2)] || translations["root"];
};`;
  }

  return `
var translations = { ${requires.join(",")} };
var env = typeof window !== "undefined" ? "browser" : "node";
var loc = env === "browser" && (window.locale || navigator.language || navigator.userLanguage) || global.locale;
var translation = loc && (translations[loc] || translations[loc.substr(0, 2)]) || translations["root"];
module.exports = translation;`;
};
