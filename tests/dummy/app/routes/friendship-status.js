import Route from '@ember/routing/route';

export default class FriendshipStatusRoute extends Route {
  degree = 'best';

  title(tokens) {
    return `We are ${this.degree} ${tokens.join(' ')}`;
  }
}
