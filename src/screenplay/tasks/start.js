import {decorate} from '../../decorate';
import {Open, step} from 'serenity-js/lib/screenplay-protractor';

import {AddATodoItem} from './add_a_todo_item.js';

export function Start(items) {
  this.items = items;
}

Start.prototype = {
  performAs(actor) {
    return actor.attemptsTo(
      Open.browserOn('/examples/angularjs/'),
      ...this.addAll(this.items)
    );
  },
  addAll(items) {
    return items.map(item => AddATodoItem.called(item));
  }
};

decorate(Start.prototype, "performAs", step('{0} starts with a Todo List containing #items'));

Start.withATodoListContaining = function(items) {
  return new Start(items);
};
