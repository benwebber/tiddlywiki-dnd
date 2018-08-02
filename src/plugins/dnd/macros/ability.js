/*\
title: $:/plugins/benwebber/dnd/macros/ability.js
type: application/javascript
module-type: macro

Calculates ability score modifiers.
\*/
(function(){
"use strict";

var dnd = require('$:/plugins/benwebber/dnd/dnd.js');

exports.name = 'dnd.ability';
exports.params = [{name: 'score'}];
exports.run = function(score) {
  return dnd.ability(score);
};
})();
