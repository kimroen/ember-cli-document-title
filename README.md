# Sane Document Title [![Build Status](https://travis-ci.org/kimroen/ember-cli-document-title.svg?branch=master)](https://travis-ci.org/kimroen/ember-cli-document-title)
This addon adds sane `document.title` integration to your ember app.

Originally based on [this gist by @machty](https://gist.github.com/machty/8413411), and since improved upon by many fabulous contributors.

Tested to work with Ember 1.10 and up.

## Install
Install by running

```
ember install ember-cli-document-title
```

## So, how does this work?
This adds two new keys to your routes:

1. `titleToken`
2. `title`

They can be either strings or functions.

Every time you transition to a route, the following will happen:

1. Ember will collect the `titleToken`s from your leafmost route and
   bubble them up until it hits a route that has `title` defined.
   `titleToken` is the name of the route's model by default.
2. If `title` is a string, that will be used as the document title
3. If `title` is a function, the collected `titleToken`s will be passed
   to it in an array.
4. What is returned from the `title` function is used as the document
   title.

## Examples!

### Simple, static titles
If you just put strings as the `title` for all your routes, that will be
used as the title for it.

```js
// routes/posts.js
export default Ember.Route.extend({
  title: 'Our Favorite posts!'
});

// routes/post.js
export default Ember.Route.extend({
  title: 'Please enjoy this post'
});
```

### Dynamic segments with a static part
Let's say you want something like "Posts - My Blog", with "- My Blog"
being static, and "Posts" being something you define on each route.

```js
// routes/posts.js
export default Ember.Route.extend({
  titleToken: 'Posts'
});
```

This will be collected and bubble up until it hits the Application Route
```js
// routes/application.js
export default Ember.Route.extend({
  title: function(tokens) {
    return tokens.join(' - ') + ' - My Blog';
  }
});
```

### Dynamic title based on model info
In this example, we want something like "Name of current post - Posts -
My Blog".

Let's say we have this object as our post-model:

```js
Ember.Object.create({
  name: 'Ember is Omakase'
});
```
And we want to use the name of each post in the title.

```js
// routes/post.js
export default Ember.Route.extend({
  titleToken: function(model) {
    return model.get('name');
  }
});
```

This will then bubble up until it reaches our Posts Route:

```js
// routes/posts.js
export default Ember.Route.extend({
  titleToken: 'Posts'
});
```

And continue to the Application Route:

```js
// routes/application.js
export default Ember.Route.extend({
  title: function(tokens) {
   var base = 'My Blog';
   var hasTokens = tokens && tokens.length;

   return hasTokens ? tokens.reverse().join(' - ') + ' - ' + base : base;
  }
});
```

This will result in these titles:
- On /posts - "Posts - My Blog"
- On /posts/1 - "Ember is Omakase - Posts - My Blog"
