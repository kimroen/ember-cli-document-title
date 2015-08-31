import Ember from 'ember';

export default Ember.Controller.extend({
  followers: 99,

  actions: {
    follow: function(){
      this.incrementProperty('followers');
    }
  }
});
