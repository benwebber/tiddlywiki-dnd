/*\
title: $:/plugins/benwebber/dnd/macros/average.js
type: application/javascript
module-type: macro

Returns the average value for a specified roll.
\*/
(function(){
  "use strict";

  exports.name = 'dnd.average';
  exports.params = [{name: 'expr'}];

  exports.run = function(expr) {
    var regexp = /(\d+)?d(\d+)\s?(?:(\-|\+)\s?(\d+))?/i;
    var match = expr.match(regexp);

    if (!match) {
      return '';
    }

    var nDice = parseInt(match[1]) || 1;
    var nSides = parseInt(match[2]);
    var op = match[3];
    var mod = parseInt(match[4]) || 0;
    var avg;

    if (!op) {
      avg = Math.floor(nDice * (1 + nSides)/2 + mod);
      return `${avg} (${nDice}d${nSides})`;
    }

    if (op == '+') {
      avg = Math.floor(nDice * (1 + nSides)/2 + mod);
    } else {
      avg = Math.floor(nDice * (1 + nSides)/2 - mod);
    }
    return `${avg} (${nDice}d${nSides} ${op} ${mod})`
  }
})();
