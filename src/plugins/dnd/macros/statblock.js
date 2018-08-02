/*\
title: $:/plugins/benwebber/dnd/macros/statblock.js
type: application/javascript
module-type: macro
\*/
(function(){
"use strict";

var dnd = require('$:/plugins/benwebber/dnd/dnd.js');
var i18n = require('$:/plugins/benwebber/dnd/i18n.js');

function renderAbilities(language, abilities) {
  var output = [];
  var renderedHeaders = '|! ' + abilities.map(function(i) {
    return language.getString(i[0]);
  }).join('|! ') + ' |';
  var renderedValues = '| ' + abilities.map(function(i) {
    return dnd.ability(i[1]);
  }).join(' | ') + ' |';
  return [
    renderedHeaders,
    renderedValues,
  ];
}

function renderTags(tags) {
  if (tags) {
    return `(${tags})`;
  }
  return tags;
}

function renderFields(language, fields, alwaysRender) {
  var output = [];
  for (var i = 0; i < fields.length; i++) {
    var caption = language.getString(fields[i][0]);
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
  var language = i18n.I18N(this.wiki, this.getVariable('languageTitle'));

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
    ['StatBlock/AC', ac],
    ['StatBlock/HP', dnd.average(hp)],
    ['StatBlock/Speed', speed],
  ]
  output = output.concat(renderFields(language, fields, true));
  output.push('');
  output.push('---');

  var abilities = [
    ['StatBlock/STR', str],
    ['StatBlock/DEX', dex],
    ['StatBlock/CON', con],
    ['StatBlock/INT', int],
    ['StatBlock/WIS', wis],
    ['StatBlock/CHA', cha],
  ];
  output = output.concat(renderAbilities(language, abilities));
  output.push('');
  output.push('---');

  fields = [
    ['StatBlock/SavingThrows', saves],
    ['StatBlock/Skills', skills],
    ['StatBlock/DamageImmunities', dimm],
    ['StatBlock/DamageResistances', dres],
    ['StatBlock/DamageVulnerabilities', dvul],
    ['StatBlock/ConditionImmunities', cimm],
    ['StatBlock/ConditionResistances', cres],
    ['StatBlock/ConditionVulnerabilities', cvul],
  ];
  output = output.concat(renderFields(language, fields, false));
  fields = [
    ['StatBlock/Senses', senses],
    ['StatBlock/Languages', languages],
    ['StatBlock/Challenge', dnd.xp(challenge)],
  ]
  output = output.concat(renderFields(language, fields, true));
  output.push('');
  output.push('---');

  return output.join('\n');
};
})();
