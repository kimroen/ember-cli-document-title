import Ember from 'ember';

export default Ember.Route.extend({
  degree: 'best',

  title: function(tokens) {
    return `We are ${this.get('degree')} ${tokens.join(' ')}`;
  }
});
