import { makeArray } from '@ember/array';
import Route from '@ember/routing/route';

export default Route.extend({
  title: function(tokens) {
    tokens = makeArray(tokens);
    tokens.unshift('My Blog');
    return tokens.reverse().join(' - ');
  }
});
