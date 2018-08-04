/*\
title: $:/plugins/benwebber/dnd/macros/statblock.js
type: application/javascript
module-type: macro
\*/
import {I18N} from "$:/plugins/benwebber/dnd/i18n.js";
import * as dnd from "$:/plugins/benwebber/dnd/dnd.js";

function renderAbilities(i18n, abilities) {
  return [
    "|! " + abilities.map((field) => i18n.getString(field.caption)).join("|! ") + " |",
    "| " + abilities.map((field) => dnd.ability(field.value)).join(" | ") + " |"
  ];
}

function renderTags(tags) {
  if (tags) {
    return `(${tags})`;
  }
  return tags;
}

function renderFields(i18n, fields, alwaysRender) {
  let output = [];
  for (let field of fields) {
    let caption = i18n.getString(field.caption);
    if (alwaysRender || field.value) {
      output.push(`|!${caption} |${field.value} |`);
    }
  }
  return output;
}


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
  cvul
) {
  let i18n = new I18N(this.wiki, this.getVariable("languageTitle"));

  let descriptionFragments = [
    size,
    type,
    renderTags(tags),
  ];
  let description = descriptionFragments.join(" ").trim();
  if (alignment) {
    description = `${description}, ${alignment}`;
  }

  let output = [
    dnd.italicize(dnd.capitalize(description)),
    "",
  ];

  let fields = [
    {caption: "StatBlock/AC", value: ac},
    {caption: "StatBlock/HP", value: dnd.average(hp)},
    {caption: "StatBlock/Speed", value: speed},
  ];
  output = output.concat(renderFields(i18n, fields, true));
  output.push("");
  output.push("---");

  let abilities = [
    {caption: "StatBlock/STR", value: str},
    {caption: "StatBlock/DEX", value: dex},
    {caption: "StatBlock/CON", value: con},
    {caption: "StatBlock/INT", value: int},
    {caption: "StatBlock/WIS", value: wis},
    {caption: "StatBlock/CHA", value: cha},
  ];
  output = output.concat(renderAbilities(i18n, abilities));
  output.push("");
  output.push("---");

  fields = [
    {caption: "StatBlock/SavingThrows", value: saves},
    {caption: "StatBlock/Skills", value: skills},
    {caption: "StatBlock/DamageImmunities", value: dimm},
    {caption: "StatBlock/DamageResistances", value: dres},
    {caption: "StatBlock/DamageVulnerabilities", value: dvul},
    {caption: "StatBlock/ConditionImmunities", value: cimm},
    {caption: "StatBlock/ConditionResistances", value: cres},
    {caption: "StatBlock/ConditionVulnerabilities", value: cvul},
  ];
  output = output.concat(renderFields(i18n, fields, false));
  fields = [
    {caption: "StatBlock/Senses", value: senses},
    {caption: "StatBlock/Languages", value: languages},
    {caption: "StatBlock/Challenge", value: dnd.xp(challenge)},
  ];
  output = output.concat(renderFields(i18n, fields, true));
  output.push("");
  output.push("---");

  return output.join("\n");
}
