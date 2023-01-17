import { makeArray } from '@ember/array';
import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  title(tokens) {
    tokens = makeArray(tokens);
    tokens.unshift('My Blog');
    return tokens.reverse().join(' - ');
  }
}
