'use strict';

module.exports = {
  name: 'ember-cli-document-title',

  included: function() {
    this._super.included.apply(this, arguments);

    const app = this._findHost();
    app.import('vendor/document-title/document-title.js');
  }
};
