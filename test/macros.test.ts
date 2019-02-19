import * as tiddlywiki from "tiddlywiki/boot/boot";


const $tw = tiddlywiki.TiddlyWiki();
$tw.boot.suppressBoot = true;
$tw.boot.argv = ["./build"];
$tw.boot.boot();


function checkOutput(wiki: any, wikitext: string, html: string) {
  const output = wiki.renderText("text/html", "text/vnd.tiddlywiki", wikitext);
  expect(output).toBe(html);
}
