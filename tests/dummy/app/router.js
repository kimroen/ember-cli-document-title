import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
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
