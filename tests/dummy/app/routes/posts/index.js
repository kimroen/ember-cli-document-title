import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.Object.create({
      title: "Ember is omakase"
    });
  },
  titleToken: function(model) {
    return model.get('title');
  }
});
