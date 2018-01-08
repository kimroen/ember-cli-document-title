import EmberObject from '@ember/object';
import Route from '@ember/routing/route';

export default Route.extend({
  model: function() {
    return EmberObject.create({
      title: "Ember is omakase"
    });
  },
  titleToken: function(model) {
    return model.get('title');
  }
});
