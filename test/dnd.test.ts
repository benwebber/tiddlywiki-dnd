/* tslint:disable:max-line-length object-literal-sort-keys */
import * as dnd from "../src/files/dnd";

import SpellFactory from "./factories/spell";
import StatBlockFactory from "./factories/statblock";


describe("Spell", () => {
  [
    {level: 0, school: "abjuration", ritual: false, expected: "abjuration <<dnd.lingo Spell/CantripTag>>"},
    {level: 1, school: "conjuration", ritual: false, expected: "1<<dnd.lingo Spell/LevelSuffix/1>>-level conjuration"},
    {level: 2, school: "divination", ritual: true, expected: "2<<dnd.lingo Spell/LevelSuffix/2>>-level divination (<<dnd.lingo Spell/RitualTag>>)"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for level = ${example.level}, school = ${example.school}, ritual = ${example.ritual}`, () => {
      const spell = SpellFactory.build({
        level: example.level,
        school: example.school,
        ritual: example.ritual,
      });
      expect(spell.description).toBe(example.expected);
    });
  });
});


describe("StatBlock", () => {
  [
    {size: "medium", expected: "medium"},
    {size: "medium", type: "humanoid", tags: "any race", alignment: "any alignment", expected: "medium humanoid (any race), any alignment"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for size = ${example.size}, type = ${example.type}, tags = ${example.tags}, alignment = ${example.alignment}`, () => {
      const creature = StatBlockFactory.build({
        size: example.size,
        type: example.type,
        tags: example.tags,
        alignment: example.alignment,
      });
      expect(creature.description).toBe(example.expected);
    });
  });
});


describe("ability", () => {
  [
    {score: "1", expected: "1 (−5)"},
    {score: "5", expected: "5 (−3)"},
    {score: "10", expected:  "10 (+0)"},
    {score: "15", expected:  "15 (+2)"},
    {score: "20", expected:  "20 (+5)"},
    {score: "30", expected:  "30 (+10)"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for score "${example.score}"`, () => {
      expect(dnd.ability(example.score)).toBe(example.expected);
    });
  });
});


describe("average", () => {
  [
    {expr: "10", expected: "10"},
    {expr: "d20", expected: "10 (1d20)"},
    {expr: "1d20", expected: "10 (1d20)"},
    {expr: "2d20+10", expected:  "31 (2d20 + 10)"},
    {expr: "2d20-10", expected:  "11 (2d20 − 10)"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for score "${example.expr}"`, () => {
      expect(dnd.average(example.expr)).toBe(example.expected);
    });
  });
});


describe("capitalize", () => {
  [
    {description: "small beast, unaligned", expected: "Small beast, unaligned"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for description "${example.description}"`, () => {
      expect(dnd.capitalize(example.description)).toBe(example.expected);
    });
  });
});


describe("check", () => {
  [
    {args: ["cha"], expected: "<<dnd.lingo Ability/CHA>>"},
    {args: ["CHA"], expected: "<<dnd.lingo Ability/CHA>>"},
    {args: ["charisma"], expected: "<<dnd.lingo Ability/CHA>>"},
    {args: ["Charisma"], expected: "<<dnd.lingo Ability/CHA>>"},
    {args: ["cha", "perf"], expected: "<<dnd.lingo Ability/CHA>> (<<dnd.lingo Skill/Performance>>)"},
    {args: ["CHA", "PERF"], expected: "<<dnd.lingo Ability/CHA>> (<<dnd.lingo Skill/Performance>>)"},
    {args: ["cha", undefined, 15], expected: "<<dnd.lingo Check/DC>> 15 <<dnd.lingo Ability/CHA>>"},
    {args: ["cha", "perf", 15], expected: "<<dnd.lingo Check/DC>> 15 <<dnd.lingo Ability/CHA>> (<<dnd.lingo Skill/Performance>>)"},
    {args: ["dex", "sl"], expected: "<<dnd.lingo Ability/DEX>> (<<dnd.lingo Skill/SleightOfHand>>)"},
    {args: ["dex", "sleight"], expected: "<<dnd.lingo Ability/DEX>> (<<dnd.lingo Skill/SleightOfHand>>)"},
    {args: ["dex", "sleight of hand"], expected: "<<dnd.lingo Ability/DEX>> (<<dnd.lingo Skill/SleightOfHand>>)"},
    {args: ["dex", "Sleight of Hand"], expected: "<<dnd.lingo Ability/DEX>> (<<dnd.lingo Skill/SleightOfHand>>)"},
    // Unknown ability:
    {args: ["foo"], expected: ""},
    {args: ["foo", "perf"], expected: ""},
    {args: ["foo", "perf", 15], expected: ""},
    // Unknown skill:
    {args: ["cha", "foo"], expected: "<<dnd.lingo Ability/CHA>>"},
    {args: ["cha", "foo", 15], expected: "<<dnd.lingo Check/DC>> 15 <<dnd.lingo Ability/CHA>>"},
    // Ambiguous skill:
    {args: ["cha", "per"], expected: "<<dnd.lingo Ability/CHA>>"},
    {args: ["cha", "per", 15], expected: "<<dnd.lingo Check/DC>> 15 <<dnd.lingo Ability/CHA>>"},
    // Unusual combination:
    {args: ["cha", "ath", 15], expected: "<<dnd.lingo Check/DC>> 15 <<dnd.lingo Ability/CHA>> (<<dnd.lingo Skill/Athletics>>)"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for (${example.args[0]}, ${example.args[1]}, ${example.args[2]})`, () => {
      expect(dnd.check(...example.args)).toBe(example.expected);
    });
  });
});


describe("italicize", () => {
  [
    {description: "Small beast, unaligned", expected: "//Small beast, unaligned//"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for description "${example.description}"`, () => {
      expect(dnd.italicize(example.description)).toBe(example.expected);
    });
  });
});


describe("xp", () => {
  [
    {rating: "0", expected: "0 (0 <<dnd.lingo XP>>)"},
    {rating: "1", expected: "1 (200 <<dnd.lingo XP>>)"},
    {rating: "10", expected: "10 (5,900 <<dnd.lingo XP>>)"},
    {rating: "30", expected: "30 (155,000 <<dnd.lingo XP>>)"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for rating "${example.rating}"`, () => {
      expect(dnd.xp(example.rating)).toBe(example.expected);
    });
  });

  [
    {rating: "1/2", expected: "1/2 (100 <<dnd.lingo XP>>)"},
    {rating: "'1/2'", expected: "1/2 (100 <<dnd.lingo XP>>)"},
    {rating: '"1/2"', expected: "1/2 (100 <<dnd.lingo XP>>)"}, // eslint-disable-line
  ].forEach((example) => {
    it(`should strip quotes and return "${example.expected}" for rating "${example.rating}"`, () => {
      expect(dnd.xp(example.rating)).toBe(example.expected);
    });
  });

  [
    {rating: "0 (10 XP)", expected: "0 (10 XP)"},
    {rating: "10 (5000 XP)", expected: "10 (5000 XP)"},
    {rating: "40", expected: "40"},
    {rating: "40 (255,000 XP)", expected: "40 (255,000 XP)"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for arbitrary rating "${example.rating}"`, () => {
      expect(dnd.xp(example.rating)).toBe(example.expected);
    });
  });
});
