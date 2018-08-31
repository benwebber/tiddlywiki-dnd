const CAPTION_PATH = "$:/plugins/benwebber/dnd/i18n";
const FALLBACK = "en";

export class I18N {
  wiki: any
  code: string
  family: string

  constructor(wiki, code) {
    this.wiki = wiki;
    this.code = code;
    this.family = code.split("-"); // e.g. en from en-CA
  }

  getString(title) {
    let paths = [
      `${CAPTION_PATH}/${this.code}`,
      `${CAPTION_PATH}/${this.family}`,
      `${CAPTION_PATH}/${FALLBACK}`
    ];
    for (let path of paths) {
      let s = this.wiki.renderTiddler("text/plain", `${path}/${title}`);
      if (s !== "") {
        return s;
      }
    }
    return "";
  }
}
