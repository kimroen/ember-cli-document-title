import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('posts', function() {});
  this.route('about');
  this.route('team');
  this.route('friendship-status', function() {});
  this.route('followers');
  this.route('donations', { path: 'donations/:donations' });
});

export default Router;
