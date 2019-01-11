/* tslint:disable:object-literal-sort-keys */
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
  "30": "155,000",
};
/* tslint:enable */


const SKILL_CODES_TO_CAPTIONS = {
  ac: "Acrobatics",
  an: "AnimalHandling",
  ar: "Arcana",
  at: "Athletics",
  d: "Deception",
  h: "History",
  ins: "Insight",
  int: "Intimidation",
  inv: "Investigation",
  m: "Medicine",
  n: "Nature",
  perc: "Perception",
  perf: "Performance",
  pers: "Persuasion",
  r: "Religion",
  sl: "SleightOfHand",
  st: "Stealth",
  su: "Survival",
};
const ABILITY_REGEX = /^(STR|DEX|CON|INT|WIS|CHA).*/i;
const SKILL_REGEX = new RegExp(`^(${Object.keys(SKILL_CODES_TO_CAPTIONS).join("|")}).*`, "i");


export class Spell {
  constructor(
    public level: string,
    public school: string,
    public cast: string,
    public ritual: boolean,
    public range: string,
    public verbal: boolean,
    public somatic: boolean,
    public material: string,
    public duration: string,
  ) {}

  get isCantrip() {
    const nLevel = parseInt(this.level, 10);
    return !isNaN(nLevel) && nLevel === 0;
  }

  get description() {
    // TODO: Translate stored school, level values in description.
    const nLevel = parseInt(this.level, 10);
    const descriptionFragments = [];
    if (!isNaN(nLevel) && !this.isCantrip) {
      descriptionFragments.push(`${this.level}<<dnd.lingo Spell/LevelSuffix/${this.level}>>-level`);
    }
    if (this.school) {
      descriptionFragments.push(this.school);
    }
    if (this.isCantrip) {
      descriptionFragments.push("<<dnd.lingo Spell/CantripTag>>");
    }
    let description = descriptionFragments.join(" ").trim();
    if (this.ritual) {
      description = `${description} (<<dnd.lingo Spell/RitualTag>>)`;
    }
    return description;
  }

  public render() {
    let output = [
      italicize(capitalize(this.description)),
      "",
    ];

    const componentFragments = [];
    if (this.verbal) {
      componentFragments.push("<<dnd.lingo Spell/Verbal>>");
    }
    if (this.somatic) {
      componentFragments.push("<<dnd.lingo Spell/Somatic>>");
    }
    if (this.material) {
      componentFragments.push(`<<dnd.lingo Spell/Material>> (${this.material})`);
    }
    const components = componentFragments.join(", ");

    const fields = [
      {caption: "Spell/CastingTime", value: this.cast},
      {caption: "Spell/Range", value: this.range},
      {caption: "Spell/Components", value: components},
      {caption: "Spell/Duration", value: this.duration},
    ];
    output = output.concat(renderFields(fields, true));
    output.push("");

    return output.join("\n");
  }
}


export class StatBlock {
  constructor(
    public size: string,
    public type: string,
    public alignment: string,
    public ac: number,
    public hp: string,
    public speed: string,
    public str: number,
    public dex: number,
    public con: number,
    public int: number,
    public wis: number,
    public cha: number,
    public senses: string,
    public languages: string,
    public challenge: string,
    public tags: string,
    public saves: string,
    public skills: string,
    public dimm: string,
    public dres: string,
    public dvul: string,
    public cimm: string,
    public cres: string,
    public cvul: string,
  ) {}

  get description() {
    // TODO: Translate stored size, type values in description.
    const descriptionFragments = [this.size, this.type];
    if (this.tags) {
      descriptionFragments.push(this.renderTags(this.tags));
    }
    let description = descriptionFragments.join(" ").trim();
    if (this.alignment) {
      description = `${description}, ${this.alignment}`;
    }
    return description;
  }

  public render() {
    let output = [
      italicize(capitalize(this.description)),
      "",
    ];

    let fields = [
      {caption: "StatBlock/AC", value: this.ac},
      {caption: "StatBlock/HP", value: average(this.hp)},
      {caption: "StatBlock/Speed", value: this.speed},
    ];
    output = output.concat(renderFields(fields, true));
    output.push("");
    output.push("---");

    const abilities = [
      {caption: "StatBlock/STR", value: this.str},
      {caption: "StatBlock/DEX", value: this.dex},
      {caption: "StatBlock/CON", value: this.con},
      {caption: "StatBlock/INT", value: this.int},
      {caption: "StatBlock/WIS", value: this.wis},
      {caption: "StatBlock/CHA", value: this.cha},
    ];
    output = output.concat(this.renderAbilities(abilities));
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
    output = output.concat(renderFields(fields, false));
    fields = [
      {caption: "StatBlock/Senses", value: this.senses},
      {caption: "StatBlock/Languages", value: this.languages},
      {caption: "StatBlock/Challenge", value: xp(this.challenge)},
    ];
    output = output.concat(renderFields(fields, true));
    output.push("");
    output.push("---");

    return output.join("\n");
  }

  private renderTags(tags) {
    return tags ? `(${tags})` : "";
  }

  private renderAbilities(abilities) {
    return [
      "| " + abilities.map((field) => `<<dnd.lingo ${field.caption}>>`).join(" | ") + " |h",
      "| " + abilities.map((field) => ability(field.value)).join(" | ") + " |",
    ];
  }

}


export function ability(score) {
  const mod = Math.floor((score - 10) / 2);
  const op = (mod >= 0) ? "+" : "−"; // minus sign (U+2212)
  return `${score} (${op}${Math.abs(mod)})`;
}


export function average(expr) {
  const regexp = /(\d+)?d(\d+)\s?(?:(-|\+)\s?(\d+))?/i;
  const match = expr.match(regexp);

  if (!match) {
    return expr;
  }

  const nDice = parseInt(match[1], 10) || 1;
  const nSides = parseInt(match[2], 10);
  let op = match[3];
  const mod = parseInt(match[4], 10) || 0;
  let avg;

  if (!op) {
    avg = Math.floor(nDice * (1 + nSides) / 2 + mod);
    return `${avg} (${nDice}d${nSides})`;
  }

  if (op === "+") {
    avg = Math.floor(nDice * (1 + nSides) / 2 + mod);
  } else {
    op = "−";
    avg = Math.floor(nDice * (1 + nSides) / 2 - mod);
  }
  return `${avg} (${nDice}d${nSides} ${op} ${mod})`;
}


export function capitalize(s) {
  return s.charAt(0).toLocaleUpperCase() + s.slice(1);
}


// tslint:disable-next-line:no-shadowed-variable
export function check(ability, skill, dc) {
  const abilityMatch = ability.match(ABILITY_REGEX);
  if (!abilityMatch) {
    return "";
  }
  const abilityCode = abilityMatch[1].toLocaleUpperCase();
  const fragments = [`<<dnd.lingo Ability/${abilityCode}>>`];

  if (skill) {
    const skillMatch = skill.match(SKILL_REGEX);
    if (skillMatch) {
      const skillCode = skillMatch[1].toLocaleLowerCase();
      fragments.push(`(<<dnd.lingo Skill/${SKILL_CODES_TO_CAPTIONS[skillCode]}>>)`);
    }
  }

  if (dc) {
    fragments.unshift(`<<dnd.lingo Check/DC>> ${dc}`);
  }
  return fragments.join(" ");
}


function findMatches(prefix, choices) {
  const matches = choices.filter((choice) => choice.startsWith(prefix));
  if (matches.length === 0) {
    return null;
  } else if (matches.length === 1) {
    return matches[0];
  } else {
    throw Error("too many matches");
  }
}

export function italicize(s) {
  return `//${s}//`;
}


function renderFields(fields, alwaysRender) {
  const output = [];
  for (const field of fields) {
    if (alwaysRender || field.value) {
      output.push(`|!<<dnd.lingo ${field.caption}>> |${field.value} |`);
    }
  }
  return output;
}


export function xp(rating) {
  rating = rating.replace(/['"]/g, "");
  const points = CR_TO_XP[rating];
  if (points) {
    return `${rating} (${points} <<dnd.lingo XP>>)`;
  }
  return `${rating}`;
}