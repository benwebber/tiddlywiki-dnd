/*\
title: $:/plugins/benwebber/dnd/macros/xp.js
type: application/javascript
module-type: macro

Render XP for challenge rating.
\*/
(function(){
"use strict";

var dnd = require('$:/plugins/benwebber/dnd/dnd.js');

exports.name = 'dnd.xp';
exports.params = [
  {name: 'rating'},
];
exports.run = function(rating) {
  return dnd.xp(rating);
};
})();
