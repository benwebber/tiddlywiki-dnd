import {I18N} from "$:/plugins/benwebber/dnd/i18n.js";
import {Spell} from "$:/plugins/benwebber/dnd/dnd.js";


export const name = "dnd.spellblock";

export const params = [
  {name: "level"},
  {name: "school"},
  {name: "cast"},
  {name: "ritual"},
  {name: "range"},
  {name: "verbal"},
  {name: "somatic"},
  {name: "material"},
  {name: "duration"},
];

export function run(...attrs) {
  let i18n = new I18N(this.wiki, this.getVariable("languageTitle"));
  let spell = new Spell(...attrs);
  return spell.render(i18n);
}
