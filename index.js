'use strict';

module.exports = {
<<<<<<< HEAD
  name: 'ember-cli-document-title',

  included: function(app) {
    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    app.import('vendor/document-title/document-title.js');
  }
=======
  name: require('./package').name,
>>>>>>> fd54f22... v3.6.0-beta.1...v3.24.0
};
