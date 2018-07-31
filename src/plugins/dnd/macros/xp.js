/*\
title: $:/plugins/benwebber/dnd/macros/xp.js
type: application/javascript
module-type: macro

Render XP for challenge rating.
\*/
(function(){
  "use strict";

  var CR_TO_XP = {
    '0': '0',
    '1/8': '25',
    '1/4': '50',
    '1/2': '100',
    '1': '200',
    '2': '450',
    '3': '700',
    '4': '1,100',
    '5': '1,800',
    '6': '2,300',
    '7': '2,900',
    '8': '3,900',
    '9': '5,000',
    '10': '5,900',
    '11': '7,200',
    '12': '8,400',
    '13': '10,000',
    '14': '11,500',
    '15': '13,000',
    '16': '15,000',
    '17': '18,000',
    '18': '20,000',
    '19': '22,000',
    '20': '25,000',
    '21': '33,000',
    '22': '41,000',
    '23': '50,000',
    '24': '62,000',
    '25': '75,000',
    '26': '90,000',
    '27': '105,000',
    '28': '120,000',
    '29': '135,000',
    '30': '155,000'
  }

  exports.name = 'dnd.xp';
  exports.params = [
    {name: 'rating'},
  ];

  exports.run = function(rating) {
    var rating = rating.replace(/['"]/g, '');
    var xp = CR_TO_XP[rating];
    if (xp) {
      return `${rating} (${xp} XP)`;
    }
    return `${rating}`;
  }
})();
