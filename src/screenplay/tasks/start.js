import {Open} from 'serenity-js/lib/screenplay-protractor';

import {AddATodoItem} from './add_a_todo_item.js';
import {defineTask} from '../../helpers';

const addAllTodos = (actor, {items}) => {
  const addItems = items.map(item => AddATodoItem.called(item));
  return actor.attemptsTo(
    ...addItems
  );
};

const RunApplication =
  defineTask()
    .addActions(Open.browserOn('/examples/angularjs/'));

export const Start =
  RunApplication
    .addActions(addAllTodos)
    .annotate('{0} starts with a Todo List containing #items')
    .defineSetters({withATodoListContaining: 'items'});
