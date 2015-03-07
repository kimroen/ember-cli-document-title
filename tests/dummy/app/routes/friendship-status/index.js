import Ember from 'ember';

export default Ember.Route.extend({
  status: 'friends',

  titleToken: function(model) {
    return this.get('status');
  }
});
