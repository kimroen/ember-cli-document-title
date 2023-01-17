import EmberObject from '@ember/object';
import Route from '@ember/routing/route';

export default class PostsIndexRoute extends Route {
  model() {
    return EmberObject.create({
      title: 'Ember is omakase',
    });
  }

  titleToken(model) {
    return model.get('title');
  }
}
