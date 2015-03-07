import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('posts', function() {});
  this.route('about');
  this.route('team');
  this.resource('friendship-status', function() {});
});

export default Router;
