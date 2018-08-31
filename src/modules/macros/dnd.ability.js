import {ability} from "$:/plugins/benwebber/dnd/dnd.js";

export const name = "dnd.ability";

export const params = [{name: "score"}];

export function run(score) {
  return ability(score);
}
