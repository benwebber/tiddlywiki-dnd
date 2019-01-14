/* tslint:disable:max-line-length object-literal-sort-keys */
import * as dnd from "../src/files/dnd";

import SpellFactory from "./factories/spell";
import StatBlockFactory from "./factories/statblock";


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
