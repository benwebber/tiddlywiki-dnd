import {capitalize} from "$:/plugins/benwebber/dnd/dnd.js";

export const name = "dnd._spellDescription";
export const params = [
  {name: "level"},
  {name: "school"},
  {name: "ritual"},
];
export function run(this: any, level: string, school: string, ritual: string) {
  const isRitual = ritual === "true";
  // tslint:disable no-shadowed-variable
  const isCantrip = (level: string) => parseInt(level, 10) === 0;
  let template: string;
  if (isCantrip(level)) {
    template = "Spell/DescriptionFormat/Cantrip";
  } else if (isRitual) {
    template = "Spell/DescriptionFormat/Ritual";
  } else {
    template = "Spell/DescriptionFormat/Default";
  }
  const format = this.wiki.renderText("text/plain", "text/vnd.tiddlywiki", `<<dnd._lingo ${template}>>`);
  const schoolName = this.wiki.renderText(
    "text/plain",
    "text/vnd.tiddlywiki",
    `<<dnd._lingo Spell/School/${capitalize(school)}>>`,
  );

  const replacements: {[index: string]: string | number} = {
    School: schoolName,
    level: `<<dnd._lingo Spell/Level/${level}>>`,
    school: schoolName.toLocaleLowerCase(),
  };
  const rendered = format.replace(/\$(\w+)\$/g, (_: string, key: string) => replacements[key]);
  return rendered;
}
