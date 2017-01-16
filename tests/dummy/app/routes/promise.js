import Ember from 'ember';

export default Ember.Route.extend({
  titleToken() {
    return new Ember.RSVP.Promise(function(resolve) {
      setTimeout(function () {
        resolve('This title is as async as possible');
      }, 3000);
    });
  }
});
