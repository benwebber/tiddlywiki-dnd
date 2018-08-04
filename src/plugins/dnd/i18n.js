/*\
title: $:/plugins/benwebber/dnd/i18n.js
type: application/javascript
module-type: library
\*/
var CAPTION_PATH = "$:/plugins/benwebber/dnd/i18n";
var FALLBACK = "en";

export class I18N {
  constructor(wiki, code) {
    this.wiki = wiki;
    this.code = code;
    this.family = code.split("-"); // e.g. en from en-CA
  }

  getString(title) {
    var paths = [
      `${CAPTION_PATH}/${this.code}`,
      `${CAPTION_PATH}/${this.family}`,
      `${CAPTION_PATH}/${FALLBACK}`
    ];
    for (var i = 0; i < paths.length; i++) {
      var s = this.wiki.renderTiddler("text/plain", `${paths[i]}/${title}`);
      if (s !== "") {
        return s;
      }
    }
    return "";
  }
}
