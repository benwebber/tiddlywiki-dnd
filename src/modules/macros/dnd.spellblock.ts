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
  ritual: string,
  range: string,
  verbal: string,
  somatic: string,
  material: string,
  duration: string,
) {
  const isRitual = ritual === "true";
  const isSomatic = somatic === "true";
  const isVerbal = verbal === "true";
  const nLevel = Number.parseInt(level, 10);
  const spell = new Spell(
    nLevel,
    school,
    cast,
    isRitual,
    range,
    isVerbal,
    isSomatic,
    material,
    duration,
  );
  return spell.render();
}
