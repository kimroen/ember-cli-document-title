/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-document-title',

  included: function(app) {
    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    
    app.import('vendor/document-title/document-title.js');
  }
};
