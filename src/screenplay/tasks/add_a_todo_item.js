import {Enter} from 'serenity-js/lib/screenplay-protractor';
import {Key} from 'protractor';
import * as TodoList from '../ui/todo_list';

import {createTask} from '../../createTask';

export const AddATodoItem = createTask('{0} adds a Todo Item with kittens called #itemName', {called: 'itemName'},
  function(actor) {
    return actor.attemptsTo(
      Enter.theValue(this.itemName)
        .into(TodoList.What_Needs_To_Be_Done)
        .thenHit(Key.ENTER)
    );
  }
);
