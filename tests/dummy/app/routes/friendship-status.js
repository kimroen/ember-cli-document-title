import Route from '@ember/routing/route';

export default Route.extend({
  degree: 'best',

  title: function (tokens) {
    return `We are ${this.degree} ${tokens.join(' ')}`;
  },
});
