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
          finalTitle = title.call(this, tokens);
        } else {
          // Tokens aren't even considered... a string
          // title just sledgehammer overwrites any children tokens.
          finalTitle = title;
        }

        if (!get(this, 'animateTitle')) {
          // Stubbable fn that sets document.title
          this.router.setTitle(finalTitle);
        } else {
          this.router.animateTitle(finalTitle, 0);          
        }
      } else {
        // Continue bubbling.
        return true;
      }
    }
  }
});

Ember.Router.reopen({
  updateTitle: Ember.on('didTransition', function() {
    this.send('collectTitleTokens', []);
  }),

  setTitle: function(title) {
    var renderer = this.container.lookup('renderer:-dom');

    if (renderer) {
      Ember.set(renderer, '_dom.document.title', title);
    } else {
      document.title = title;
    }
  },

  animateTitle: function(title, index) {
    this.setTitle(title.slice(index) + ' - ' + title.substr(0, index));
    Ember.run.later(this, function() {
      index = index === title.length ? 0 : index + 1;
      this.animateTitle(title, index);
    }, 300);
  }
});
