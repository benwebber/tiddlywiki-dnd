/*\
title: $:/plugins/benwebber/dnd/macros/xp.js
type: application/javascript
module-type: macro

Render XP for challenge rating.
\*/
import {xp} from '$:/plugins/benwebber/dnd/dnd.js';

export const name = 'dnd.xp';

export const params = [
  {name: 'rating'},
];

export function run(rating) {
  return xp(rating);
}
