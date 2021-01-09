# Sane Document Title [![Build Status](https://travis-ci.org/kimroen/ember-cli-document-title.svg?branch=master)](https://travis-ci.org/kimroen/ember-cli-document-title) [![Ember Observer Score](http://emberobserver.com/badges/ember-cli-document-title.svg)](http://emberobserver.com/addons/ember-cli-document-title) [![Code Climate](https://codeclimate.com/github/kimroen/ember-cli-document-title/badges/gpa.svg)](https://codeclimate.com/github/kimroen/ember-cli-document-title)
This addon adds sane `document.title` integration to your ember app.

Originally based on [this gist by @machty](https://gist.github.com/machty/8413411), and since improved upon by many fabulous contributors.

Tested to work with Ember 1.13.13 and up.

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
   tokens = Ember.makeArray(tokens);
   tokens.unshift('My Blog');
   return tokens.reverse().join(' - ');
  }
});
```

This will result in these titles:
- On /posts - "Posts - My Blog"
- On /posts/1 - "Ember is Omakase - Posts - My Blog"

### Async titles using promises
You may be in a situation where it makes sense to have one or more of your `titleToken`s be asynchronous. For example if a related model is async, or you just enjoy working with Promises in your past-time.

Luckily, you can return a promise from any of your `titleToken` functions, and they will all be resolved by the time your `title` function receives them.

An example! Let's say we have these two Ember Data models; a `post` and its `user`:

```js
// models/post.js
export default DS.Model.extend({
  name: DS.attr('string'),
  author: DS.belongsTo('user', { async: true })
});
```

```js
// models/user.js
export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string')
});
```

In our document title, we want the name of the author in parenthesis along with the post title.

The `author` relationship is `async`, so getting it will return a promise. Here's
an example where we return a promise that resolves to the post name plus the author
name in parenthesis:

```js
// routes/post.js
export default Ember.Route.extend({
  titleToken: function(model) {
    var postName = model.get('name');

    return model.get('author')
      .then(function (user) {
        var authorName = user.get('firstName') + user.get('lastName');

        return postName + '(by ' + authorName + ')';
      });
  }
});
```

With the same configuration for `Posts` and `Application` routes as in the previous example, this will result in this title:
- On /posts/1 - "Ember is Omakase (by John Smith) - Posts - My Blog"

It's worth noting that the page title will not update until all the promises have resolved.

### Use with `ember-cli-head`

Using `ember-cli-document-title` with [ember-cli-head](https://github.com/ronco/ember-cli-head)
is very straight forward and allows you to use the wonderful route based declarative API for
`title` and still easily add other things to the document's `<head>` (i.e. `meta` tags).

Only a few tweaks are needed to use both of these addons together:

* Install both addons:

```sh
ember install ember-cli-head
ember install ember-cli-document-title
```

* Add `headData` and `setTitle` to your `app/router.js`:

```js
const Router = Ember.Router.extend({
  location: config.locationType,
  headData: Ember.inject.service(),

  setTitle(title) {
    this.get('headData').set('title', title);
  }
});
```

* Remove `<title>` from your `app/index.html`.

* Update `app/templates/head.hbs` (added by ember-cli-head):

```hbs
{{! app/templates/head.hbs }}

<title>{{model.title}}</title>
```
