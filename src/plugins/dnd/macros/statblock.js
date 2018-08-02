/*\
title: $:/plugins/benwebber/dnd/macros/statblock.js
type: application/javascript
module-type: macro
\*/
(function(){
"use strict";

var dnd = require('$:/plugins/benwebber/dnd/dnd.js');

function renderTags(tags) {
  if (tags) {
    return `(${tags})`;
  }
  return tags;
}

function renderFields(fields, alwaysRender) {
  var output = [];
  for (var i = 0; i < fields.length; i++) {
    var caption = fields[i][0];
    var value = fields[i][1];
    if (alwaysRender || value) {
      output.push(`|!${caption} |${value} |`);
    }
  }
  return output;
}


exports.name = 'dnd.statblock';
exports.params = [
  // All monsters/NPCs have these attributes:
  {name: 'size'},
  {name: 'type'},
  {name: 'alignment'},
  {name: 'ac'},
  {name: 'hp'},
  {name: 'speed'},
  {name: 'str', default: 10},
  {name: 'dex', default: 10},
  {name: 'con', default: 10},
  {name: 'int', default: 10},
  {name: 'wis', default: 10},
  {name: 'cha', default: 10},
  {name: 'senses'},
  {name: 'languages', default: '---'},
  {name: 'challenge'},
  // These attributes are optional:
  {name: 'tags'},
  {name: 'saves'},
  {name: 'skills'},
  {name: 'dimm'}, // Damage Immunities
  {name: 'dres'}, // Damage Resistances
  {name: 'dvul'}, // Damage Vulnerabilities
  {name: 'cimm'}, // Condition Immunities
  {name: 'cres'}, // Condition Resistances
  {name: 'cvul'}, // Condition Vulnerabilities
];
exports.run = function(
  size,
  type,
  alignment,
  ac,
  hp,
  speed,
  str,
  dex,
  con,
  int,
  wis,
  cha,
  senses,
  languages,
  challenge,
  tags,
  saves,
  skills,
  dimm,
  dres,
  dvul,
  cimm,
  cres,
  cvul
  ) {
  var descriptionFragments = [
    size,
    type,
    renderTags(tags),
  ];
  var description = descriptionFragments.join(' ').trim();
  if (alignment) {
    description = `${description}, ${alignment}`
  }

  var output = [
    dnd.italicize(dnd.capitalize(description)),
    '',
  ];

  var fields = [
    ['Armor Class', ac],
    ['Hit Points', dnd.average(hp)],
    ['Speed', speed],
  ]

  output = output.concat(renderFields(fields, true));
  output.push('');
  output.push('---');

  output = output.concat([
    '|! STR |! DEX |! CON |! INT |! WIS |! CHA |',
    `| ${dnd.ability(str)} | ${dnd.ability(dex)} | ${dnd.ability(con)} | ${dnd.ability(int)} | ${dnd.ability(wis)} | ${dnd.ability(cha)} |`,
  ])
  output.push('');
  output.push('---');

  fields = [
    ['Saving Throws', saves],
    ['Skills', skills],
    ['Damage Immunities', dimm],
    ['Damage Resistances', dres],
    ['Damage Vulnerabilities', dvul],
    ['Condition Immunities', cimm],
    ['Condition Resistances', cres],
    ['Condition Vulnerabilities', cvul],
  ];
  output = output.concat(renderFields(fields, false));
  fields = [
    ['Senses', senses],
    ['Languages', languages],
    ['Challenge', dnd.xp(challenge)],
  ]
  output = output.concat(renderFields(fields, true));
  output.push('');
  output.push('---');

  return output.join('\n');
};
})();
