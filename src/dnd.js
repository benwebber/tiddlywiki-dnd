/*\
title: $:/plugins/benwebber/dnd/dnd.js
type: application/javascript
module-type: library
\*/
const ABILITIES = {
  STR: "Strength",
  DEX: "Dexterity",
  CON: "Constitution",
  INT: "Intelligence",
  WIS: "Wisdom",
  CHA: "Charisma",
};


const CR_TO_XP = {
  "0": "0",
  "1/8": "25",
  "1/4": "50",
  "1/2": "100",
  "1": "200",
  "2": "450",
  "3": "700",
  "4": "1,100",
  "5": "1,800",
  "6": "2,300",
  "7": "2,900",
  "8": "3,900",
  "9": "5,000",
  "10": "5,900",
  "11": "7,200",
  "12": "8,400",
  "13": "10,000",
  "14": "11,500",
  "15": "13,000",
  "16": "15,000",
  "17": "18,000",
  "18": "20,000",
  "19": "22,000",
  "20": "25,000",
  "21": "33,000",
  "22": "41,000",
  "23": "50,000",
  "24": "62,000",
  "25": "75,000",
  "26": "90,000",
  "27": "105,000",
  "28": "120,000",
  "29": "135,000",
  "30": "155,000"
};


const SKILLS = [
  "Acrobatics",
  "Animal Handling",
  "Arcana",
  "Athletics",
  "Deception",
  "History",
  "Insight",
  "Intimidation",
  "Investigation",
  "Medicine",
  "Nature",
  "Perception",
  "Performance",
  "Persuasion",
  "Religion",
  "Sleight of Hand",
  "Stealth",
  "Survival",
];


export class Spell {
  constructor(
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
    this.level = parseInt(level);
    this.school = school;
    this.cast = cast;
    this.ritual = ritual;
    this.range = range;
    this.verbal = verbal;
    this.somatic = somatic;
    this.material = material;
    this.duration = duration;
  }

  get isCantrip() {
    return !Number.isNaN(this.level) && this.level === 0;
  }

  get description() {
    let descriptionFragments = [];
    if (!Number.isNaN(this.level) && !this.isCantrip) {
      descriptionFragments.push(`${ordinal(this.level)}-level`);
    }
    if (this.school) {
      descriptionFragments.push(this.school);
    }
    if (this.isCantrip) {
      descriptionFragments.push("cantrip");
    }
    let description = descriptionFragments.join(" ").trim();
    if (this.ritual) {
      description = `${description} (ritual)`;
    }
    return description;
  }

  render(i18n) {
    let output = [
      italicize(capitalize(this.description)),
      "",
    ];

    let componentFragments = [];
    if (this.verbal) {
      componentFragments.push("V");
    }
    if (this.somatic) {
      componentFragments.push("S");
    }
    if (this.material) {
      componentFragments.push(`M (${this.material})`);
    }
    let components = componentFragments.join(", ");

    let fields = [
      {caption: "Spell/CastingTime", value: this.cast},
      {caption: "Spell/Range", value: this.range},
      {caption: "Spell/Components", value: components},
      {caption: "Spell/Duration", value: this.duration}
    ];
    output = output.concat(renderFields(i18n, fields, true));
    output.push("");

    return output.join("\n");
  }
}


export class StatBlock {
  constructor(
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
    this.size = size;
    this.type = type;
    this.alignment = alignment;
    this.ac = ac;
    this.hp = hp;
    this.speed = speed;
    this.str = str;
    this.dex = dex;
    this.con = con;
    this.int = int;
    this.wis = wis;
    this.cha = cha;
    this.senses = senses;
    this.languages = languages;
    this.challenge = challenge;
    this.tags = tags;
    this.saves = saves;
    this.skills = skills;
    this.dimm = dimm;
    this.dres = dres;
    this.dvul = dvul;
    this.cimm = cimm;
    this.cres = cres;
    this.cvul = cvul;
  }

  get description() {
    let descriptionFragments = [this.size, this.type];
    if (this.tags) {
      descriptionFragments.push(this._renderTags(this.tags));
    }
    let description = descriptionFragments.join(" ").trim();
    if (this.alignment) {
      description = `${description}, ${this.alignment}`;
    }
    return description;
  }

  render(i18n) {
    let output = [
      italicize(capitalize(this.description)),
      "",
    ];

    let fields = [
      {caption: "StatBlock/AC", value: this.ac},
      {caption: "StatBlock/HP", value: average(this.hp)},
      {caption: "StatBlock/Speed", value: this.speed},
    ];
    output = output.concat(renderFields(i18n, fields, true));
    output.push("");
    output.push("---");

    let abilities = [
      {caption: "StatBlock/STR", value: this.str},
      {caption: "StatBlock/DEX", value: this.dex},
      {caption: "StatBlock/CON", value: this.con},
      {caption: "StatBlock/INT", value: this.int},
      {caption: "StatBlock/WIS", value: this.wis},
      {caption: "StatBlock/CHA", value: this.cha},
    ];
    output = output.concat(this._renderAbilities(i18n, abilities));
    output.push("");
    output.push("---");

    fields = [
      {caption: "StatBlock/Saves", value: this.saves},
      {caption: "StatBlock/Skills", value: this.skills},
      {caption: "StatBlock/DamageImmunities", value: this.dimm},
      {caption: "StatBlock/DamageResistances", value: this.dres},
      {caption: "StatBlock/DamageVulnerabilities", value: this.dvul},
      {caption: "StatBlock/ConditionImmunities", value: this.cimm},
      {caption: "StatBlock/ConditionResistances", value: this.cres},
      {caption: "StatBlock/ConditionVulnerabilities", value: this.cvul},
    ];
    output = output.concat(renderFields(i18n, fields, false));
    fields = [
      {caption: "StatBlock/Senses", value: this.senses},
      {caption: "StatBlock/Languages", value: this.languages},
      {caption: "StatBlock/Challenge", value: xp(this.challenge)},
    ];
    output = output.concat(renderFields(i18n, fields, true));
    output.push("");
    output.push("---");

    return output.join("\n");
  }

  _renderTags(tags) {
    return tags ? `(${tags})` : "";
  }

  _renderAbilities(i18n, abilities) {
    return [
      "|! " + abilities.map((field) => i18n.getString(field.caption)).join("|! ") + " |",
      "| " + abilities.map((field) => ability(field.value)).join(" | ") + " |"
    ];
  }

}


export function ability(score) {
  let mod = Math.floor((score - 10)/2);
  let op = (mod >= 0) ? "+" : "−"; // minus sign (U+2212)
  return `${score} (${op}${Math.abs(mod)})`;
}


export function average(expr) {
  let regexp = /(\d+)?d(\d+)\s?(?:(-|\+)\s?(\d+))?/i;
  let match = expr.match(regexp);

  if (!match) {
    return expr;
  }

  let nDice = parseInt(match[1]) || 1;
  let nSides = parseInt(match[2]);
  let op = match[3];
  let mod = parseInt(match[4]) || 0;
  let avg;

  if (!op) {
    avg = Math.floor(nDice * (1 + nSides)/2 + mod);
    return `${avg} (${nDice}d${nSides})`;
  }

  if (op == "+") {
    avg = Math.floor(nDice * (1 + nSides)/2 + mod);
  } else {
    op = "−";
    avg = Math.floor(nDice * (1 + nSides)/2 - mod);
  }
  return `${avg} (${nDice}d${nSides} ${op} ${mod})`;
}


export function capitalize(s) {
  return s.charAt(0).toLocaleUpperCase() + s.slice(1);
}


export function check(ability, skill, dc) {
  ability = ability.toLocaleUpperCase();
  let abilityRegexp = /^(STR|DEX|CON|INT|WIS|CHA).*/;
  let match = ability.match(abilityRegexp);

  if (!match) {
    return "";
  }

  ability = ABILITIES[match[1]];
  let fragments = [ability];

  try {
    skill = findMatches(skill.toLocaleLowerCase(), SKILLS.map((skill) => skill.toLocaleLowerCase()));
  } catch (e) {
    skill = null;
  }

  if (skill) {
    fragments.push(`(${capitalize(skill)})`);
  }
  if (dc) {
    fragments.unshift(`DC ${dc}`);
  }
  return fragments.join(" ");
}


function findMatches(prefix, choices) {
  let matches = choices.filter((choice) => choice.startsWith(prefix));
  if (matches.length == 0) {
    return null;
  } else if (matches.length == 1) {
    return matches[0];
  } else {
    throw Error("too many matches");
  }
}

export function italicize(s) {
  return `//${s}//`;
}


export function ordinal(n) {
  // TODO: Test cast (or switch to TypeScript).
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


export function xp(rating) {
  rating = rating.replace(/['"]/g, "");
  let xp = CR_TO_XP[rating];
  if (xp) {
    return `${rating} (${xp} XP)`;
  }
  return `${rating}`;
}
