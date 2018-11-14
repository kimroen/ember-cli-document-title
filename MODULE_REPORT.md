## Module Report
### Unknown Global

**Global**: `Ember.Registry`

**Location**: `tests/unit/router-test.js` at line 13

```js
    originalTitle = document.title;
    
    if (Ember.Registry) {
      registry = new Ember.Registry();
      container = registry.container();
```

### Unknown Global

**Global**: `Ember.Registry`

**Location**: `tests/unit/router-test.js` at line 14

```js
    
    if (Ember.Registry) {
      registry = new Ember.Registry();
      container = registry.container();
    } else {
```

### Unknown Global

**Global**: `Ember.Container`

**Location**: `tests/unit/router-test.js` at line 17

```js
      container = registry.container();
    } else {
      registry = container = new Ember.Container();
    }

```
