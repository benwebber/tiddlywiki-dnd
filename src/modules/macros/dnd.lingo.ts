declare const $tw: any;

function getPluginString(widget: any, plugin: string, languageTitle: string, title: string, options = {}) {
  return widget.wiki.renderTiddler(
    "text/plain",
    `$:/plugins/${plugin}/languages/${languageTitle}/${title}`,
    options,
  );
}

export const name = "dnd.lingo";
export const params = [
  {name: "title"},
];
export function run(title) {
  const plugin = "benwebber/dnd";
  const languageTitle = this.getVariable("languageTitle");
  // Check if localized string exists.
  let text = getPluginString(this, "benwebber/dnd", languageTitle, title);
  if (text) {
    return text;
  }
  // Check if string is defined in dependency.
  const dependents = this.wiki.getTextReference(`$:/languages/${languageTitle}!!dependents`, "");
  const dependentLanguageTitles = $tw.utils.parseStringArray(dependents)
    .map((tiddler) => tiddler.replace("$:/languages/", ""));
  for (const dependentLanguageTitle of dependentLanguageTitles) {
    text = getPluginString(this, plugin, dependentLanguageTitle, title);
    if (text) {
      return text;
    }
  }
  // Fall back to default string.
  return this.wiki.renderTiddler("text/plain", `$:/plugins/${plugin}/language/${title}`);
}
