/*\
title: $:/plugins/benwebber/dnd/macros/ability.js
type: application/javascript
module-type: macro

Calculates ability score modifiers.
\*/
(function(){
  "use strict";

  exports.name = 'dnd.ability';
  exports.params = [{name: 'score'}];

  exports.run = function(score) {
    var mod = Math.floor((score - 10)/2);
    var op = (mod >= 0) ? '+' : '-'
    return `${score} (${op}${mod})`
  }
})();
