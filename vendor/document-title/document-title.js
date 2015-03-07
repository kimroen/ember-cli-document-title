var get = Ember.get;

// Extend Ember.Route to add support for sensible
// document.title integration.
Ember.Route.reopen({

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

  // Provided by Ember
  _actions: {
    collectTitleTokens: function(tokens) {
      var titleToken = get(this, 'titleToken');
      if (typeof titleToken === 'function') {
        titleToken = titleToken.call(this, get(this, 'currentModel'));
      }

      if (Ember.isArray(titleToken)) {
        tokens.unshift.apply(this, titleToken);
      } else if (titleToken) {
        tokens.unshift(titleToken);
      }

      // If `title` exists, it signals the end of the
      // token-collection, and the title is decided right here.
      var title = get(this, 'title');
      if (title) {
        var finalTitle;
        if (typeof title === 'function') {
          finalTitle = title(tokens);
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
  }
});

Ember.Router.reopen({
  updateTitle: function() {
    this.send('collectTitleTokens', []);
  }.on('didTransition'),

  setTitle: function(title) {
    if (Ember.testing) {
      this._title = title;
    } else {
      window.document.title = title;
    }
  }
});
