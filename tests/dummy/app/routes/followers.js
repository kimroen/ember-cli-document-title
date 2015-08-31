import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: Ember.computed.alias('volatileController.followers'),

  title: function(tokens) {
    return 'Followers: ' + tokens[0];
  }
});
