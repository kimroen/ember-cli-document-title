'use strict';

var path = require('path');
var fs   = require('fs');

function EmberCLIDocumentTitle(project) {
  this.project = project;
  this.name    = 'Ember CLI Document Title';
}

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

EmberCLIDocumentTitle.prototype.treeFor = function treeFor(name) {
  var treePath = path.join('node_modules/ember-cli-document-title', name + '-addon');

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

EmberCLIDocumentTitle.prototype.included = function included(app) {
  this.app = app;

  this.app.import('vendor/document-title/document-title.js');
};

module.exports = EmberCLIDocumentTitle;
