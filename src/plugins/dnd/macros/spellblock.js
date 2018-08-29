/*\
title: $:/plugins/benwebber/dnd/macros/spellblock.js
type: application/javascript
module-type: macro
\*/
import {I18N} from "$:/plugins/benwebber/dnd/i18n.js";
import * as dnd from "$:/plugins/benwebber/dnd/dnd.js";


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


function ordinal(n) {
  let i = parseInt(n);
  let ones = i % 10;
  let tens = i % 100;
  let ending;
  if (ones === 1 && tens !== 11) {
    ending = "st";
  } else if (ones === 2 && tens !== 12) {
    ending = "nd";
  } else if (ones === 3 && tens !== 13) {
    ending = "rd";
  } else {
    ending = "th";
  }
  return `${i}${ending}`;
}


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
  level,
  school,
  cast,
  ritual,
  range,
  verbal,
  somatic,
  material,
  duration
) {
  let i18n = new I18N(this.wiki, this.getVariable("languageTitle"));

  let descriptionFragments = [];
  let nLevel = parseInt(level);

  let isCantrip = (!Number.isNaN(nLevel) && nLevel === 0) ? true : false;

  if (!Number.isNaN(nLevel) && !isCantrip) {
    descriptionFragments.push(`${ordinal(nLevel)}-level`);
  }
  if (school) {
    descriptionFragments.push(school);
  }
  if (isCantrip) {
    descriptionFragments.push("cantrip");
  }
  let description = descriptionFragments.join(" ").trim();
  if (ritual) {
    description = `${description} (ritual)`;
  }

  let output = [
    dnd.italicize(dnd.capitalize(description)),
    "",
  ];

  let componentFragments = [];
  if (verbal) {
    componentFragments.push("V");
  }
  if (somatic) {
    componentFragments.push("S");
  }
  if (material) {
    componentFragments.push(`M (${material})`);
  }
  let components = componentFragments.join(", ");

  let fields = [
    {caption: "Spell/CastingTime", value: cast},
    {caption: "Spell/Range", value: range},
    {caption: "Spell/Components", value: components},
    {caption: "Spell/Duration", value: duration}
  ];
  output = output.concat(renderFields(i18n, fields, true));
  output.push("");

  return output.join("\n");
}
