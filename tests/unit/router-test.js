import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let originalTitle;

module('router:main', function(hooks) {
  setupTest(hooks);
  hooks.beforeEach(function() {
    originalTitle = document.title;
    this.router = this.owner.lookup('router:main');
  });

  hooks.afterEach(function() {
    document.title = originalTitle;
  });

  test('it sets document title on the renderer:-dom if present', function(assert) {
    let renderer = { _dom: { document: {} } };

    this.owner.register('renderer:-dom', {
      create: function() {
        return renderer;
      },
    });

    this.router.setTitle('foo - renderer test');
    assert.equal(
      renderer._dom.document.title,
      'foo - renderer test',
      'title should be set on the renderer'
    );
  });

  test('it sets document title on the real `document.title` if renderer is not present', function(assert) {
    this.router.setTitle('foo - no renderer test');
    assert.equal(
      document.title,
      'foo - no renderer test',
      'title should be set on the document'
    );
  });
});
