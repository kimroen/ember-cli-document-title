import Route from '@ember/routing/route';

export default class PromiseRoute extends Route {
  titleToken() {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve('This title is as async as possible');
      }, 3000);
    });
  }
}
