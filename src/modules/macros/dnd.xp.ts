import {getXP} from "$:/plugins/benwebber/dnd/dnd.js";

export const name = "dnd.xp";

export const params = [
  {name: "rating"},
  {name: "xp"},
];

export function run(this: any, rating: string, xp: string): string {
  const languageTitle = this.getVariable("languageTitle");
  const formatter = new Intl.NumberFormat(languageTitle);
  // Try using user input directly. If `xp` is a number, use it.
  let nXP = parseInt(xp, 10);
  const hasXP = !Number.isNaN(nXP);
  if (hasXP) {
    return `${rating} (${formatter.format(nXP)} <<dnd._lingo XP>>)`;
  }
  // If `xp` is not a number or not defined, try using a standard score.
  nXP = getXP(rating);
  if (nXP != null) {
    // Use standard scores (<<dnd.xp 5>>)
    return `${rating} (${formatter.format(nXP)} <<dnd._lingo XP>>)`;
  }
  // Unknown rating: pass through (<<dnd.xp "5 (800 XP)">>).
  return rating;
}
