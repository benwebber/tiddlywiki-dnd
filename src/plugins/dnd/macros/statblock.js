/*\
title: $:/plugins/benwebber/dnd/macros/statblock.js
type: application/javascript
module-type: macro
\*/
import {I18N} from "$:/plugins/benwebber/dnd/i18n.js";
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

export function run(...attrs) {
  let i18n = new I18N(this.wiki, this.getVariable("languageTitle"));
  let statblock = new StatBlock(...attrs);
  return statblock.render(i18n);
}
