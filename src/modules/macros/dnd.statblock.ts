import {StatBlock} from "$:/plugins/benwebber/dnd/dnd.js";

export const name = "dnd.statblock";

export const params = [
  // All monsters/NPCs have these attributes:
  {name: "size"},
  {name: "type"},
  {name: "alignment"},
  {name: "ac"},
  {name: "hp"},
  {name: "speed"},
  {name: "str", default: 10},
  {name: "dex", default: 10},
  {name: "con", default: 10},
  {name: "int", default: 10},
  {name: "wis", default: 10},
  {name: "cha", default: 10},
  {name: "senses"},
  {name: "languages", default: "---"},
  {name: "challenge"},
  // These attributes are optional:
  {name: "tags"},
  {name: "saves"},
  {name: "skills"},
  {name: "dimm"}, // Damage Immunities
  {name: "dres"}, // Damage Resistances
  {name: "dvul"}, // Damage Vulnerabilities
  {name: "cimm"}, // Condition Immunities
  {name: "cres"}, // Condition Resistances
  {name: "cvul"}, // Condition Vulnerabilities
];

export function run(
  size: string,
  type: string,
  alignment: string,
  ac: number,
  hp: string,
  speed: string,
  str: number,
  dex: number,
  con: number,
  int: number,
  wis: number,
  cha: number,
  senses: string,
  languages: string,
  challenge: string,
  tags: string,
  saves: string,
  skills: string,
  dimm: string,
  dres: string,
  dvul: string,
  cimm: string,
  cres: string,
  cvul: string,
) {
  const statblock = new StatBlock(
    size,
    type,
    alignment,
    ac,
    hp,
    speed,
    str,
    dex,
    con,
    int,
    wis,
    cha,
    senses,
    languages,
    challenge,
    tags,
    saves,
    skills,
    dimm,
    dres,
    dvul,
    cimm,
    cres,
    cvul,
  );
  return statblock.render();
}
