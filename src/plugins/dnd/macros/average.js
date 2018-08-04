/*\
title: $:/plugins/benwebber/dnd/macros/average.js
type: application/javascript
module-type: macro

Returns the average value for a specified roll.
\*/
import {average} from "$:/plugins/benwebber/dnd/dnd.js";

export const name = "dnd.average";

export const params = [{name: "expr"}];

export function run(expr) {
  return average(expr);
}
