import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application, originalTitle;

module('Acceptance: DocumentTitle', {
  beforeEach: function() {
    originalTitle = document.title;
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    document.title = originalTitle;
  }
});

test('Show default title properly - no tokens', function(assert) {
  assert.expect(1);

  visit('/');

  andThen(function() {
    assert.equal(document.title, 'My Blog', 'Default title is correct');
  });
});

test('static title doesn\'t bubble', function(assert) {
  assert.expect(1);

  visit('/about');

  andThen(function() {
    assert.equal(document.title, 'About Us', 'It doesn\'t bubble up');
  });
});

test('bubbling title tokens', function(assert) {
  assert.expect(1);

  visit('/team');

  andThen(function() {
    assert.equal(document.title, 'The Team - My Blog', 'The title token bubbles up');
  });
});

test('dynamic title based on a model', function(assert) {
  assert.expect(1);

  visit('/posts');

  andThen(function() {
    assert.equal(document.title, 'Ember is omakase - Posts - My Blog');
  });
});

test('dynamic title based on route attributes', function(assert) {
  assert.expect(1);

  visit('/friendship-status');

  andThen(function() {
    assert.equal(document.title, 'We are best friends',
      'the context is correct for `title` and `titleToken`');
  });
});

test('returning an array from titleToken works', function(assert) {
  assert.expect(1);

  visit('/candy');

  andThen(function() {
    assert.equal(document.title,
      'My favorite candies are dumle and sort pepper');
  });
});

test('title updates when you switch routes', function(assert) {
  assert.expect(2);

  visit('/about');

  andThen(function() {
    assert.equal(document.title, 'About Us');
  });

  click('.test-posts-link');

  andThen(function() {
    assert.equal(document.title, 'Ember is omakase - Posts - My Blog');
  });
});

test('promise title is set after promise is resolved', function(assert) {
  assert.expect(1);

  var done = assert.async();

  visit('/promise');

  andThen(function() {
    setTimeout(function () {
      assert.equal(document.title, 'This title is as async as possible - My Blog');
      done();
    }, 4000);
  });
});
