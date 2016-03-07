import Ember from 'ember';

export default Ember.Route.extend({
  title(tokens) {
    return `My favorite candies are ${tokens.join(' and ')}`;
  },

  titleToken() {
    return ['dumle', 'sort pepper'];
  }
});
