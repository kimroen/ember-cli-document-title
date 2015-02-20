/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-document-title',

  included: function() {
    this.app.import('vendor/document-title/document-title.js');
  }
};
