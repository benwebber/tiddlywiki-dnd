/*\
title: $:/plugins/benwebber/dnd/macros/ability.js
type: application/javascript
module-type: macro

Calculates ability score modifiers.
\*/
import {ability} from '$:/plugins/benwebber/dnd/dnd.js';

export const name = 'dnd.ability';

export const params = [{name: 'score'}];

export function run(score) {
  return ability(score);
};
