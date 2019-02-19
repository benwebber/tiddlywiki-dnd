import * as tiddlywiki from "tiddlywiki/boot/boot";


const $tw = tiddlywiki.TiddlyWiki();
$tw.boot.suppressBoot = true;
$tw.boot.argv = ["./build"];
$tw.boot.boot();

// Patch TiddlyWiki macros with source modules to measure coverage.
import * as averageMacro from "../src/modules/macros/dnd.average";
$tw.macros["dnd.average"] = averageMacro;


function checkOutput(wiki: any, wikitext: string, html: string) {
  const output = wiki.renderText("text/html", "text/vnd.tiddlywiki", wikitext);
  expect(output).toBe(html);
}


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
