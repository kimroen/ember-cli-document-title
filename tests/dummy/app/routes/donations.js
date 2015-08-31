import Ember from 'ember';

export default Ember.Route.extend({
  model: function(param) {
    if (param.donations === 'b') {
      return Ember.Object.create({
        donations: 0
      });
    } else {
      return Ember.Object.create({
        donations: 999
      });
    }
  },

  title: Ember.computed('volatileController.model.donations', function() {
    return 'Donations: ' + this.get('volatileController.model.donations');
  }),

  actions: {
    donate: function() {
      this.get('volatileController.model').incrementProperty('donations');
    }
  }
});
