'use strict';

module.exports = {
  name: require('./package').name,

  included: function(app) {
    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    app.import('vendor/document-title/document-title.js');
  }
};
