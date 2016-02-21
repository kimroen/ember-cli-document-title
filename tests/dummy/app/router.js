import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('posts', function() {});
  this.route('about');
  this.route('team');
  this.route('friendship-status', function() {});
});

export default Router;
