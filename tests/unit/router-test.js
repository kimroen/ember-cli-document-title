import Ember from 'ember';
import { module, skip } from 'qunit';

var container, registry, router, originalTitle;

module('router:main', {
  beforeEach: function() {
    originalTitle = document.title;

    if (Ember.Registry) {
      registry = new Ember.Registry();
      container = registry.container();
    } else {
      registry = container = new Ember.Container();
    }

    registry.register('location:none', Ember.NoneLocation);

    router = Ember.Router.create({
      location: 'none',
      container: container
    });

    if (Ember.setOwner) {
      Ember.setOwner(router, container);
    }
  },

  afterEach: function() {
    document.title = originalTitle;
  }
});

skip('it sets document title on the renderer:-dom if present', function(assert) {
  var renderer = { _dom: { document: {} } };

  registry.register('renderer:-dom', {
    create: function() {
      return renderer;
    }
  });

  router.setTitle('foo - renderer test');
  assert.equal(renderer._dom.document.title, 'foo - renderer test', 'title should be set on the renderer');
});

skip('it sets document title on the real `document.title` if renderer is not present', function(assert) {
  router.setTitle('foo - no renderer test');
  assert.equal(document.title, 'foo - no renderer test', 'title should be set on the document');
});
