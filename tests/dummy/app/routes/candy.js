import Route from '@ember/routing/route';

export default Route.extend({
  title(tokens) {
    return `My favorite candies are ${tokens.join(' and ')}`;
  },

  titleToken() {
    return ['dumle', 'sort pepper'];
  }
});
