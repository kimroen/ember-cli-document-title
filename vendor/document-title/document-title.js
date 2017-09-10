var get = Ember.get;
var getOwner = Ember.getOwner;
var Promise = Ember.RSVP.Promise;

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
  title: null
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
  collectTitleTokens: function(tokens) {
    var titleToken = get(this, 'titleToken');
    if (typeof titleToken === 'function') {
      titleToken = titleToken.call(this, get(this, 'currentModel'));
    }

    if (Ember.isArray(titleToken)) {
      tokens.unshift.apply(tokens, titleToken);
    } else if (titleToken) {
      tokens.unshift(titleToken);
    }

    // If `title` exists, it signals the end of the
    // token-collection, and the title is decided right here.
    var title = get(this, 'title');
    if (title) {
      var self = this;

      // Wrap in promise in case some tokens are asynchronous.
      var completion = Promise.resolve()
      .then(function() {
        if (typeof title === 'function') {
          // Wait for all tokens to resolve. It resolves immediately if all tokens are plain values (not promises).
          return Promise.all(tokens)
            .then(function(resolvedTokens) {
              return title.call(self, resolvedTokens);
            });
        } else {
          // Tokens aren't even considered... a string
          // title just sledgehammer overwrites any children tokens.
          return title;
        }
      })
      .then(function(finalTitle) {
        // Stubbable fn that sets document.title
        self.router.setTitle(finalTitle);
      });

      // Tell FastBoot about our async code
      var fastboot = lookupFastBoot(this);
      if (fastboot && fastboot.isFastBoot) {
        fastboot.deferRendering(completion);
      }

    } else {
      // Continue bubbling.
      return true;
    }
  }
};

Ember.Route.reopen(routeProps);

Ember.Router.reopen({
  updateTitle: Ember.on('didTransition', function() {
    this.send('collectTitleTokens', []);
  }),

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

function lookupFastBoot(context) {
  var container = getOwner ? getOwner(context) : context.container;
  return container.lookup('service:fastboot');
}
