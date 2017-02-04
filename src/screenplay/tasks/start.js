import {Open} from 'serenity-js/lib/screenplay-protractor';

import {AddATodoItem} from './add_a_todo_item.js';
import {defineTask} from '../../helpers';

const addAllTodos = ({items}, actor) => {
  const addItems = items.map(item => AddATodoItem.called(item));
  return actor.attemptsTo(
    ...addItems
  );
};

export const Start =
  defineTask()
    .annotate('{0} starts with a Todo List containing #items')
    .addActions(
      Open.browserOn('/examples/angularjs/'),
      addAllTodos
    )
    .defineSetters({withATodoListContaining: 'items'});
