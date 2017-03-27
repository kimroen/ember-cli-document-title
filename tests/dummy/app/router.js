import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('posts', function() {});
  this.route('about');
  this.route('team');
  this.route('candy');
  this.route('friendship-status', function() {});
  this.route('promise');
});

export default Router;
