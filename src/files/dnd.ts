/* tslint:disable:object-literal-sort-keys */
const CR_TO_XP: {[index: string]: number} = {
  "0": 0,
  "1/8": 25,
  "1/4": 50,
  "1/2": 100,
  "1": 200,
  "2": 450,
  "3": 700,
  "4": 1100,
  "5": 1800,
  "6": 2300,
  "7": 2900,
  "8": 3900,
  "9": 5000,
  "10": 5900,
  "11": 7200,
  "12": 8400,
  "13": 10000,
  "14": 11500,
  "15": 13000,
  "16": 15000,
  "17": 18000,
  "18": 20000,
  "19": 22000,
  "20": 25000,
  "21": 33000,
  "22": 41000,
  "23": 50000,
  "24": 62000,
  "25": 75000,
  "26": 90000,
  "27": 105000,
  "28": 120000,
  "29": 135000,
  "30": 155000,
};
/* tslint:enable */


const SKILL_CODES_TO_CAPTIONS: {[index: string]: string} = {
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


export enum AttackType {
  Melee,
  Ranged,
  MeleeOrRanged,
}


export enum DamageType {
  Acid = "<<dnd._lingo Damage/Type/Acid>>",
  Bludgeoning = "<<dnd._lingo Damage/Type/Bludgeoning>>",
  Cold = "<<dnd._lingo Damage/Type/Cold>>",
  Fire = "<<dnd._lingo Damage/Type/Fire>>",
  Force = "<<dnd._lingo Damage/Type/Force>>",
  Lightning = "<<dnd._lingo Damage/Type/Lightning>>",
  Necrotic = "<<dnd._lingo Damage/Type/Necrotic>>",
  Piercing = "<<dnd._lingo Damage/Type/Piercing>>",
  Poison = "<<dnd._lingo Damage/Type/Poison>>",
  Psychic = "<<dnd._lingo Damage/Type/Psychic>>",
  Radiant = "<<dnd._lingo Damage/Type/Radiant>>",
  Slashing = "<<dnd._lingo Damage/Type/Slashing>>",
  Thunder = "<<dnd._lingo Damage/Type/Thunder>>",
}


interface ITableRow {
  caption: string;
  value: string | number;
}


export class Character {
  constructor(public cls: string, public race: string, public alignment: string, public languages: string) {}

  public render(): string {
    const fields = [
      {caption: "Character/Class", value: this.cls},
      {caption: "Character/Race", value: this.race},
      {caption: "Character/Alignment", value: this.alignment},
      {caption: "Character/Languages", value: this.languages},
    ];
    const output = renderFields(fields, false);
    output.push("");
    return output.join("\n");
  }
}


export class Spell {
  constructor(
    public level: number,
    public school: string,
    public cast: string,
    public ritual: boolean,
    public range: string,
    public verbal: boolean,
    public somatic: boolean,
    public material: string,
    public duration: string,
  ) {}

  get isCantrip(): boolean {
    return !isNaN(this.level) && this.level === 0;
  }

  public render(): string {
    const descriptionLevel = Number.isNaN(this.level) ? "" : this.level;
    let output = [
      `//<<dnd._spellDescription level:"${descriptionLevel}" school:"${this.school}" ritual:"${this.ritual}">>//`,
      "",
    ];

    const componentFragments: string[] = [];
    if (this.verbal) {
      componentFragments.push("<<dnd._lingo Spell/Verbal>>");
    }
    if (this.somatic) {
      componentFragments.push("<<dnd._lingo Spell/Somatic>>");
    }
    if (this.material) {
      componentFragments.push(`<<dnd._lingo Spell/Material>> (${this.material})`);
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
    public ac: string,
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

  get description(): string {
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

  public render(): string {
    let output = [
      `//${capitalize(this.description)}//`,
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

    // Does the challenge field embed XP?
    const challengeRegexp = /(\d+)\s+(\d+)?/;
    const challengeMatch = this.challenge.match(challengeRegexp);
    let challengeMacro = `<<dnd.xp "${this.challenge}">>`;
    if (challengeMatch && challengeMatch[2]) {
      challengeMacro = `<<dnd.xp "${challengeMatch[1]}" "${challengeMatch[2]}">>`;
    }
    fields = [
      {caption: "StatBlock/Senses", value: this.senses},
      {caption: "StatBlock/Languages", value: this.languages},
      {caption: "StatBlock/Challenge", value: challengeMacro},
    ];
    output = output.concat(renderFields(fields, true));
    output.push("");
    output.push("---");

    return output.join("\n");
  }

  private renderTags(tags: string): string {
    return tags ? `(${tags})` : "";
  }

  private renderAbilities(abilities: ITableRow[]): string[] {
    return [
      "| " + abilities.map((field) => `<<dnd._lingo ${field.caption}>>`).join(" | ") + " |h",
      "| " + abilities.map((field) => ability(field.value as number)).join(" | ") + " |",
    ];
  }

}


export function ability(score: number): string {
  return `${score} (${modifier(score)})`;
}


export function modifier(score: number): string {
  const mod = Math.floor((score - 10) / 2);
  const op = (mod >= 0) ? "+" : "−"; // minus sign (U+2212)
  return `${op}${Math.abs(mod)}`;
}


export function average(expr: string): string {
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


export function capitalize(s: string): string {
  return s.charAt(0).toLocaleUpperCase() + s.slice(1);
}


// tslint:disable-next-line:no-shadowed-variable
export function check(ability: string, skill?: string, dc?: number): string {
  const abilityMatch = ability.match(ABILITY_REGEX);
  if (!abilityMatch) {
    return "";
  }
  const abilityCode = abilityMatch[1].toLocaleUpperCase();
  const fragments = [`<<dnd._lingo Ability/${abilityCode}>>`];

  if (skill) {
    const skillMatch = skill.match(SKILL_REGEX);
    if (skillMatch) {
      const skillCode = skillMatch[1].toLocaleLowerCase();
      fragments.push(`(<<dnd._lingo Skill/${SKILL_CODES_TO_CAPTIONS[skillCode]}>>)`);
    }
  }

  if (dc) {
    fragments.unshift(`<<dnd._lingo Check/DC>> ${dc}`);
  }
  return fragments.join(" ");
}


function renderFields(fields: ITableRow[], alwaysRender?: boolean): string[] {
  const output: string[] = [];
  for (const field of fields) {
    if (alwaysRender || field.value) {
      output.push(`|!<<dnd._lingo ${field.caption}>> |${field.value} |`);
    }
  }
  return output;
}


export function getXP(rating: string): number {
  rating = rating.replace(/['"]/g, "");
  return CR_TO_XP[rating];
}


export function hit(
  damage: string,
  damageType: DamageType,
  extraDamage: string,
  extraDamageType: DamageType,
  condDamage: string,
  condDamageType: DamageType,
  extraCondDamage: string,
  extraCondDamageType: DamageType,
  when: string,
  effect: string,
): string {
  const buffer = ["//<<dnd._lingo StatBlock/Action/Hit>>://"];
  buffer.push(renderDamage(damage, damageType, extraDamage, extraDamageType));
  let or = "";
  if (condDamage && condDamageType && when) {
    or = `${renderDamage(condDamage, condDamageType, extraCondDamage, extraCondDamageType)} ${when}`;
  }
  let output = buffer.join(" ");
  if (or) {
    output = `${output}, <<dnd._lingo StatBlock/Action/Or>> ${or}`;
  }
  if (effect) {
    output = `${output}, ${effect}`;
  }
  return `${output}.`;
}


function renderDamage(damage: string, damageType: string, extraDamage: string, extraDamageType: string): string {
  let buffer = [
    average(damage),
    damageType,
  ];
  if (extraDamage && extraDamageType) {
    buffer = buffer.concat([
      "<<dnd._lingo StatBlock/Action/Plus>>",
      average(extraDamage),
      extraDamageType,
    ]);
  }
  return buffer.join(" ");
}


export function weaponAttack(
  attackType: AttackType,
  bonus: string,
  reach: string,
  range: string,
  target: string,
) {
  // tslint:disable max-line-length
  const attackTypesToCaptions = {
    [AttackType.Melee]: {
      attack: "<<dnd._lingo StatBlock/Action/Melee>>",
      reachOrRange: `<<dnd._lingo StatBlock/Action/Reach>> ${reach}`,
    },
    [AttackType.Ranged]: {
      attack: "<<dnd._lingo StatBlock/Action/Ranged>>",
      reachOrRange: `<<dnd._lingo StatBlock/Action/Range>> ${range}`,
    },
    [AttackType.MeleeOrRanged]: {
      attack: "<<dnd._lingo StatBlock/Action/MeleeOrRanged>>",
      reachOrRange: `<<dnd._lingo StatBlock/Action/Reach>> ${reach} <<dnd._lingo StatBlock/Action/Or>> <<dnd._lingo StatBlock/Action/Range>> ${range}`,
    },
  };
  const captions = attackTypesToCaptions[attackType];
  const output = [
    `//${captions.attack}:// ${bonus} <<dnd._lingo StatBlock/Action/ToHit>>`,
    captions.reachOrRange,
    target || "<<dnd._lingo StatBlock/Action/DefaultTarget>>",
  ];
  return `${output.join(", ")}.`;
}
