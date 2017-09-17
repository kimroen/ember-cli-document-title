import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  headData: Ember.inject.service(),

  setTitle(title) {
    this.get('headData').set('title', title);
  }
});

Router.map(function() {
});

export default Router;
