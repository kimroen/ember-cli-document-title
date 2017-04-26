var get = Ember.get;
var getOwner = Ember.getOwner;

var routeProps = {
  // `titleToken` can either be a static string or a function
  // that accepts a model object and returns a string (or array
  // of strings if there are multiple tokens).
  titleToken: null,

  // `title` can either be a static string or a function
  // that accepts an array of tokens and returns a string
  // that will be the document title. The `collectTitleTokens` action
  // stops bubbling once a route is encountered that has a `title`
  // defined.
  title: null,

  // 'volatileController' must be used instead of `controller` when creating
  // a computed property for `title` or `titleToken` because `controller`
  // is not observable.
  volatileController: Ember.computed(function() {
    return this.get('controller');
  }).volatile()
};

/*
  This is here because `_actions` was renamed to `actions` in Ember 2.0.0, but
  we need it to work for versions before that.

  Here, we inspect the `Ember.Route` prototype, iterate over its
  `mergedProperties` to see what is used, and then use that.
 */
var mergedActionPropertyName = (function() {
  var routeProto = Ember.Route.proto();
  var mergedProps = routeProto.mergedProperties;

  for (var i = 0, l = mergedProps.length; i < l; i++) {
    var property = mergedProps[i];

    if (property === 'actions' || property === '_actions') {
      return property;
    }
  }
})();

routeProps[mergedActionPropertyName] = {
  collectTitleTokens: function(routes) {
    routes.push(this);

    // If `title` exists, it signals the end of the token-collection.
    var title = get(this, 'title');
    if (title) {
      this.router.setTitleRoutes(routes);
    } else {
      // Continue bubbling.
      return true;
    }
  }
};

Ember.Route.reopen(routeProps);

Ember.Router.reopen({

  titleTokenRoutes: Ember.A(),

  titleRoute: null,

  updateTitleRoutes: Ember.on('didTransition', function() {
    this.send('collectTitleTokens', Ember.A());
  }),

  setTitleRoutes: function(routes) {
    // title observer
    var newTitleRoute = routes[routes.length - 1];
    if (this.titleRoute !== newTitleRoute) {
      if (this.titleRoute) {
        this.titleRoute.removeObserver('title', this, 'titleChanged');
      }
      this.titleRoute = newTitleRoute;
      newTitleRoute.addObserver('title', this, 'titleChanged');
    }

    // titleToken observers
    var removedRoutes = Ember.A(), keptRoutes = Ember.A();
    this.titleTokenRoutes.forEach(function(route){
      (routes.contains(route) ? keptRoutes : removedRoutes).push(route);
    });

    this.titleTokenRoutes = routes;

    removedRoutes.forEach(function (route) {
      route.removeObserver('titleToken', this, 'titleChanged');
    }, this);

    routes.forEach(function (route) {
      if (!keptRoutes.contains(route)) {
        route.addObserver('titleToken', this, 'titleChanged');
      }
    }, this);

    // update title
    this.computeTitle();
  },

  titleChanged: function() {
    Ember.run.scheduleOnce('render', this, 'computeTitle');
  },

  computeTitle: function() {
    var title = get(this.titleRoute, 'title');

    if (typeof title === 'function') {
      var tokens = Ember.A();
      this.titleTokenRoutes.forEach(function (route) {
        var titleToken = get(route, 'titleToken');
        if (typeof titleToken === 'function') {
          titleToken = titleToken.call(route, get(route, 'currentModel'));
        }

        if (Ember.isArray(titleToken)) {
          tokens.unshift.apply(route, titleToken);
        } else if (titleToken) {
          tokens.unshift(titleToken);
        }
      }, this);

      title = title.call(this.titleRoute, tokens);
    }

    // Stubbable fn that sets document.title
    this.setTitle(title);
  },

  setTitle: function(title) {
    var container = getOwner ? getOwner(this) : this.container;
    var renderer = container.lookup('renderer:-dom');
    var domForAppWithGlimmer2 = container.lookup('service:-document');

    if (renderer && renderer._dom) {
      Ember.set(renderer, '_dom.document.title', title);
    } else if (domForAppWithGlimmer2) {
      // Glimmer 2 has a different renderer
      Ember.set(domForAppWithGlimmer2, 'title', title);
    } else {
      document.title = title;
    }
  }
});
