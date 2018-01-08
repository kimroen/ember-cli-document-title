import Route from '@ember/routing/route';

export default Route.extend({
  status: 'friends',

  titleToken: function() {
    return this.get('status');
  }
});
