import {ability} from "$:/plugins/benwebber/dnd/dnd.js";

export const name = "dnd.ability";

export const params = [{name: "score"}];

export function run(this: any, score: string): string {
  const nScore = Number.parseInt(score, 10);
  return ability(nScore);
}
