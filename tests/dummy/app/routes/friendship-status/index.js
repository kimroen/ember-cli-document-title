import Ember from 'ember';

export default Ember.Route.extend({
  status: 'friends',

  titleToken: function() {
    return this.get('status');
  }
});
