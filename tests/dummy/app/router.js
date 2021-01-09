import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('posts', function() {});
  this.route('about');
  this.route('team');
  this.route('candy');
  this.route('friendship-status', function() {});
  this.route('promise');
});

export default Router;
