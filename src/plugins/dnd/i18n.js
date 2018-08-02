/*\
title: $:/plugins/benwebber/dnd/i18n.js
type: application/javascript
module-type: library
\*/
(function() {
"use strict";

var CAPTION_PATH = '$:/plugins/benwebber/dnd/i18n';
var FALLBACK = 'en';

function I18N(wiki, code) {
  var family = code.split('-'); // e.g. en from en-CA

  return {
    getString: function(title) {
      var paths = [
        `${CAPTION_PATH}/${code}`,
        `${CAPTION_PATH}/${family}`,
        `${CAPTION_PATH}/${FALLBACK}`
      ];
      for (var i = 0; i < paths.length; i++) {
        var s = wiki.renderTiddler('text/plain', `${paths[i]}/${title}`);
        if (s !== '') {
          return s;
        }
      }
      return '';
    }
  }
}

exports.I18N = I18N;
})();
