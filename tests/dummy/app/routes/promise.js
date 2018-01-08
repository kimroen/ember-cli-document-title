import { Promise as EmberPromise } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return new EmberPromise(function(resolve) {
      setTimeout(function () {
        resolve('This title is as async as possible');
      }, 3000);
    });
  }
});
