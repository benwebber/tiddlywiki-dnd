declare const $tw: any;

export const name = "dnd._lingo";
export const params = [
  {name: "title"},
];
export function run(title) {
  const plugin = "benwebber/dnd";
  const languageTitle = this.getVariable("languageTitle");
  const tiddlerTitle = `$:/plugins/${plugin}/languages/${languageTitle}/${title}`;
  if (this.wiki.isShadowTiddler(tiddlerTitle)) {
    return `{{${tiddlerTitle}}}`;
  }
  // Check if string is defined in dependency.
  const dependents = this.wiki.getTextReference(`$:/languages/${languageTitle}!!dependents`, "");
  const dependentLanguageTitles = $tw.utils.parseStringArray(dependents)
    .map((tiddler) => tiddler.replace("$:/languages/", ""));
  for (const dependentLanguageTitle of dependentLanguageTitles) {
    const dependentTiddlerTitle = `$:/plugins/${plugin}/languages/${dependentLanguageTitle}/${title}`;
    if (this.wiki.isShadowTiddler(dependentTiddlerTitle)) {
      return `{{${dependentTiddlerTitle}}}`;
    }
  }
  // Fall back to default string.
  return `{{$:/plugins/${plugin}/language/${title}}}`;
}
