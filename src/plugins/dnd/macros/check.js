/*\
title: $:/plugins/benwebber/dnd/macros/check.js
type: application/javascript
module-type: macro

Render an ability or skill check, optionally with DC.
\*/
import {check} from "$:/plugins/benwebber/dnd/dnd.js";

export const name = "dnd.check";

export const params = [
  {name: "ability"},
  {name: "skill"},
  {name: "dc"},
];

export function run(ability, skill, dc) {
  return check(ability, skill, dc);
}
