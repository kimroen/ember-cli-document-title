import Ember from 'ember';
import { module, test } from 'qunit';

let container, registry, router;

module('router:main', {
  beforeEach: function() {

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

});

test('it sets document title on the headData service', function(assert) {
  let headData = {};
  registry.register('service:headData', {
    create: function() {
      return headData;
    }
  });
  router.setTitle('foo - head-data test');
  assert.equal(headData.title, 'foo - head-data test', 'title should be set on the head-data service');
});
