import Route from '@ember/routing/route';

export default class FriendshipStatusIndexRoute extends Route {
  status = 'friends';

  titleToken() {
    return this.status;
  }
}
