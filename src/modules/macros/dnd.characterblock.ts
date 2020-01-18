import {Character} from "$:/plugins/benwebber/dnd/dnd.js";


export const name = "dnd.characterblock";

export const params = [
  {name: "class"},
  {name: "race"},
  {name: "alignment"},
  {name: "languages"},
  {name: "factions"},
];

export function run(
  this: any,
  cls: string,
  race: string,
  alignment: string,
  languages: string,
  factions: string,
): string {
  if (this.wiki.getTiddler(cls)) {
    cls = `[[${cls}]]`;
  }
  if (this.wiki.getTiddler(race)) {
    race = `[[${race}]]`;
  }
  const character = new Character(cls, race, alignment, languages, factions);
  return character.render();
}
