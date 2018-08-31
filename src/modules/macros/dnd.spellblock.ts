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

export function run(
  level: string,
  school: string,
  cast: string,
  ritual: boolean,
  range: string,
  verbal: boolean,
  somatic: boolean,
  material: string,
  duration: string,
) {
  let i18n = new I18N(this.wiki, this.getVariable("languageTitle"));
  let spell = new Spell(
    level,
    school,
    cast,
    ritual,
    range,
    verbal,
    somatic,
    material,
    duration,
  );
  return spell.render(i18n);
}
