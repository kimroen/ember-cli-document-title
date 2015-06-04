import Ember from 'ember';

export default Ember.Route.extend({
  animateTitle: true,

  title: function(tokens) {
    var base = 'My Awesome Blog';
    var hasTokens = tokens && tokens.length;

    return hasTokens ? tokens.reverse().join(' - ') + ' - ' + base : base;
  }
});
