import Ember from 'ember';

export default Ember.Route.extend({
  title: function(tokens) {
    return tokens.reverse().join(' - ') + ' - My Blog';
  }
});
