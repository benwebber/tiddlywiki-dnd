import * as tiddlywiki from "tiddlywiki/boot/boot";


const $tw = tiddlywiki.TiddlyWiki();
$tw.boot.suppressBoot = true;
$tw.boot.argv = ["./build"];
$tw.boot.boot();

// Patch TiddlyWiki macros with source modules to measure coverage.
import * as abilityMacro from "../src/modules/macros/dnd.ability";
$tw.macros["dnd.ability"] = abilityMacro;
import * as averageMacro from "../src/modules/macros/dnd.average";
$tw.macros["dnd.average"] = averageMacro;
import * as checkMacro from "../src/modules/macros/dnd.check";
$tw.macros["dnd.check"] = checkMacro;


function checkOutput(wiki: any, wikitext: string, html: string) {
  const output = wiki.renderText("text/html", "text/vnd.tiddlywiki", wikitext);
  expect(output).toBe(html);
}


describe("dnd.ability", () => {
  [
    {score: 1, expected: "1 (−5)"},
    {score: 5, expected: "5 (−3)"},
    {score: 10, expected:  "10 (+0)"},
    {score: 15, expected:  "15 (+2)"},
    {score: 20, expected:  "20 (+5)"},
    {score: 30, expected:  "30 (+10)"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for score "${example.score}"`, () => {
      checkOutput($tw.wiki, `<<dnd.ability ${example.score}>>`, `<p>${example.expected}</p>`);
    });
  });
});


describe("dnd.average", () => {
  [
    {expr: "10", expected: "10"},
    {expr: "d20", expected: "10 (1d20)"},
    {expr: "1d20", expected: "10 (1d20)"},
    {expr: "2d20+10", expected:  "31 (2d20 + 10)"},
    {expr: "2d20-10", expected:  "11 (2d20 − 10)"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for score "${example.expr}"`, () => {
      checkOutput($tw.wiki, `<<dnd.average ${example.expr}>>`, `<p>${example.expected}</p>`);
    });
  });
});


describe("dnd.check", () => {
  [
    {args: "cha", expected: "Charisma"},
    {args: "CHA", expected: "Charisma"},
    {args: "charisma", expected: "Charisma"},
    {args: "Charisma", expected: "Charisma"},
    {args: "cha perf", expected: "Charisma (Performance)"},
    {args: "CHA PERF", expected: "Charisma (Performance)"},
    {args: "cha dc:15", expected: "DC 15 Charisma"},
    {args: "cha perf 15", expected: "DC 15 Charisma (Performance)"},
    {args: "dex sl", expected: "Dexterity (Sleight of Hand)"},
    {args: "dex sleight", expected: "Dexterity (Sleight of Hand)"},
    {args: `dex "sleight of hand"`, expected: "Dexterity (Sleight of Hand)"},
    {args: `dex "Sleight of Hand"`, expected: "Dexterity (Sleight of Hand)"},
    // Unknown ability:
    {args: "foo", expected: ""},
    {args: "foo perf", expected: ""},
    {args: "foo perf 15", expected: ""},
    // Unknown skill:
    {args: "cha foo", expected: "Charisma"},
    {args: "cha foo 15", expected: "DC 15 Charisma"},
    // Ambiguous skill:
    {args: "cha per", expected: "Charisma"},
    {args: "cha per 15", expected: "DC 15 Charisma"},
    // Unusual combination:
    {args: "cha ath 15", expected: "DC 15 Charisma (Athletics)"},
  ].forEach((example) => {
    it(`should return "${example.expected}" for (${example.args})`, () => {
      const expectedOutput = example.expected ? `<p>${example.expected}</p>` : "";
      checkOutput($tw.wiki, `<<dnd.check ${example.args}>>`, expectedOutput);
    });
  });
});
