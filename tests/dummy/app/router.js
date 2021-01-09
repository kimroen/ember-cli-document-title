import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

<<<<<<< HEAD
Router.map(function() {
  this.route('posts', function() {});
  this.route('about');
  this.route('team');
  this.route('candy');
  this.route('friendship-status', function() {});
  this.route('promise');
});

export default Router;
=======
Router.map(function () {});
>>>>>>> fd54f22... v3.6.0-beta.1...v3.24.0
