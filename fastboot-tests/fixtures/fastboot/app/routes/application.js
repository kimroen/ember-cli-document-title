import Ember from 'ember';

export default Ember.Route.extend({
  title(tokens) {
    tokens = [...tokens, "application"];
    return tokens.reverse().join(' - ');
  }
});
