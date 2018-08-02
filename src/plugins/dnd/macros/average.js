/*\
title: $:/plugins/benwebber/dnd/macros/average.js
type: application/javascript
module-type: macro

Returns the average value for a specified roll.
\*/
(function(){
"use strict";

var dnd = require('$:/plugins/benwebber/dnd/dnd.js');

exports.name = 'dnd.average';
exports.params = [{name: 'expr'}];
exports.run = function(expr) {
  return dnd.average(expr);
};
})();
