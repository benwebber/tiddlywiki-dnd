import {check} from "$:/plugins/benwebber/dnd/dnd.js";

export const name = "dnd.check";

export const params = [
  {name: "ability"},
  {name: "skill"},
  {name: "dc"},
];

export function run(ability: string, skill: string, dc: string): string {
  const nDC = Number.parseInt(dc, 10);
  return check(ability, skill, nDC);
}
