import Route from '@ember/routing/route';

export default class CandyRoute extends Route {
  title(tokens) {
    return `My favorite candies are ${tokens.join(' and ')}`;
  }

  get titleToken() {
    return ['dumle', 'sort pepper'];
  }
}
