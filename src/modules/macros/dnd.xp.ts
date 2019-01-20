import {getXP} from "$:/plugins/benwebber/dnd/dnd.js";

export const name = "dnd.xp";

export const params = [
  {name: "rating"},
  {name: "xp"},
];

export function run(rating, xp) {
  const languageTitle = this.getVariable("languageTitle");
  const formatter = new Intl.NumberFormat(languageTitle);
  // Try using user input directly. If `xp` is a number, use it.
  const hasXP = !Number.isNaN(parseInt(xp, 10));
  if (hasXP) {
    return `${rating} (${formatter.format(xp)} <<dnd._lingo XP>>)`;
  }
  // If `xp` is not a number or not defined, try using a standard score.
  xp = getXP(rating);
  if (xp != null) {
    // Use standard scores (<<dnd.xp 5>>)
    return `${rating} (${formatter.format(xp)} <<dnd._lingo XP>>)`;
  }
  // Unknown rating: pass through (<<dnd.xp "5 (800 XP)">>).
  return rating;
}
