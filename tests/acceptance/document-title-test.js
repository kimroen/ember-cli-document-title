import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application, router;

module('Acceptance: DocumentTitle', {
  beforeEach: function() {
    application = startApp();
    router = application.__container__.lookup('router:main');
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('static title doesn\'t bubble', function(assert) {
  assert.expect(1);

  visit('/about');

  andThen(function() {
    assert.equal(router._title, 'About Us', 'It doesn\'t bubble up');
  });
});

test('bubbling title tokens', function(assert) {
  assert.expect(1);

  visit('/team');

  andThen(function() {
    assert.equal(router._title, 'The Team - My Blog', 'The title token bubbles up');
  });
});

test('dynamic title based on a model', function(assert) {
  assert.expect(1);

  visit('/posts');

  andThen(function() {
    assert.equal(router._title, 'Ember is omakase - Posts - My Blog');
  });
});
