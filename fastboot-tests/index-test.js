'use strict';
/* eslint-env mocha */
/* eslint-disable ember/no-global-jquery, ember/named-functions-in-promises */

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('index', function() {
  setupTest('fastboot', {
    installPackages: {
      "ember-cli-head": "^0.3.1"
    }
  });

  it('renders', function() {
    return this.visit('/')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('body').length).to.equal(1);
        expect($('h1').text().trim()).to.equal('ember-fastboot-addon-tests');
        expect($('title').text().trim()).to.equal('application - index');
      });
  });

});
