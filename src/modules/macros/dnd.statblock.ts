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
  ac: string,
  hp: string,
  speed: string,
  str: string,
  dex: string,
  con: string,
  int: string,
  wis: string,
  cha: string,
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
  const nStr = Number.parseInt(str, 10);
  const nDex = Number.parseInt(dex, 10);
  const nCon = Number.parseInt(con, 10);
  const nInt = Number.parseInt(int, 10);
  const nWis = Number.parseInt(wis, 10);
  const nCha = Number.parseInt(cha, 10);
  const statblock = new StatBlock(
    size,
    type,
    alignment,
    ac,
    hp,
    speed,
    nStr,
    nDex,
    nCon,
    nInt,
    nWis,
    nCha,
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
