import {Character} from "$:/plugins/benwebber/dnd/dnd.js";


export const name = "dnd.characterblock";

export const params = [
  {name: "class"},
  {name: "race"},
  {name: "alignment"},
  {name: "languages"},
];

export function run(
  this: any,
  cls: string,
  race: string,
  alignment: string,
  languages: string,
): string {
  if (this.wiki.getTiddler(cls)) {
    cls = `[[${cls}]]`;
  }
  if (this.wiki.getTiddler(race)) {
    race = `[[${race}]]`;
  }
  const character = new Character(cls, race, alignment, languages);
  return character.render();
}
