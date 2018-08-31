import {average} from "$:/plugins/benwebber/dnd/dnd.js";

export const name = "dnd.average";

export const params = [{name: "expr"}];

export function run(expr) {
  return average(expr);
}
