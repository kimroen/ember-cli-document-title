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
      var finalTitle;
      if (typeof title === 'function') {
        finalTitle = title.call(this, tokens);
      } else {
        // Tokens aren't even considered... a string
        // title just sledgehammer overwrites any children tokens.
        finalTitle = title;
      }

      // Stubbable fn that sets document.title
      this.router.setTitle(finalTitle);
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

    if (renderer) {
      Ember.set(renderer, '_dom.document.title', title);
    } else {
      document.title = title;
    }
  }
});
