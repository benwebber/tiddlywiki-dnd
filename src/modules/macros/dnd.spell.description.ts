import {capitalize} from "$:/plugins/benwebber/dnd/dnd.js";

export const name = "dnd.spell.description";
export const params = [
  {name: "level"},
  {name: "school"},
  {name: "ritual"},
];
export function run(
  level: string,
  school: string,
  ritual: string,
) {
  const isRitual = ritual === "true";
  // tslint:disable no-shadowed-variable
  const isCantrip = (level) => parseInt(level, 10) === 0;
  let template: string;
  if (isCantrip(level)) {
    template = "Spell/DescriptionFormat/Cantrip";
  } else if (isRitual) {
    template = "Spell/DescriptionFormat/Ritual";
  } else {
    template = "Spell/DescriptionFormat/Default";
  }
  const format = this.wiki.renderText("text/plain", "text/vnd.tiddlywiki", `<<dnd.lingo ${template}>>`);
  const schoolName = this.wiki.renderText(
    "text/plain",
    "text/vnd.tiddlywiki",
    `<<dnd.lingo Spell/School/${capitalize(school)}>>`,
  );

  const replacements = {
    School: schoolName,
    level,
    levelSuffix: `<<dnd.lingo Spell/LevelSuffix/${level}>>`,
    school: schoolName.toLocaleLowerCase(),
  };
  const rendered = format.replace(/\$(\w+)\$/g, (_, key) => replacements[key]);
  return rendered;
}
