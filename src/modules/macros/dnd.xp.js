import {xp} from "$:/plugins/benwebber/dnd/dnd.js";

export const name = "dnd.xp";

export const params = [
  {name: "rating"},
];

export function run(rating) {
  return xp(rating);
}
