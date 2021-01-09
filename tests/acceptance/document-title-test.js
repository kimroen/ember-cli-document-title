import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

let originalTitle;

module('Acceptance: DocumentTitle', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    originalTitle = document.title;
  });

  hooks.afterEach(function () {
    document.title = originalTitle;
  });

  test('Show default title properly - no tokens', async function (assert) {
    assert.expect(1);

    await visit('/');

    assert.equal(document.title, 'My Blog', 'Default title is correct');
  });

  test("static title doesn't bubble", async function (assert) {
    assert.expect(1);

    await visit('/about');

    assert.equal(document.title, 'About Us', "It doesn't bubble up");
  });

  test('bubbling title tokens', async function (assert) {
    assert.expect(1);

    await visit('/team');

    assert.equal(
      document.title,
      'The Team - My Blog',
      'The title token bubbles up'
    );
  });

  test('dynamic title based on a model', async function (assert) {
    assert.expect(1);

    await visit('/posts');

    assert.equal(document.title, 'Ember is omakase - Posts - My Blog');
  });

  test('dynamic title based on route attributes', async function (assert) {
    assert.expect(1);

    await visit('/friendship-status');

    assert.equal(
      document.title,
      'We are best friends',
      'the context is correct for `title` and `titleToken`'
    );
  });

  test('returning an array from titleToken works', async function (assert) {
    assert.expect(1);

    await visit('/candy');

    assert.equal(
      document.title,
      'My favorite candies are dumle and sort pepper'
    );
  });

  test('title updates when you switch routes', async function (assert) {
    assert.expect(2);

    await visit('/about');

    assert.equal(document.title, 'About Us');

    await click('.test-posts-link');

    assert.equal(document.title, 'Ember is omakase - Posts - My Blog');
  });

  test('promise title is set after promise is resolved', async function (assert) {
    assert.expect(1);

    var done = assert.async();

    await visit('/promise');

    setTimeout(function () {
      assert.equal(
        document.title,
        'This title is as async as possible - My Blog'
      );
      done();
    }, 4000);
  });
});
