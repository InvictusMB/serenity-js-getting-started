import {Enter} from 'serenity-js/lib/screenplay-protractor';
import {Key} from 'protractor';
import * as TodoList from '../ui/todo_list';

import {defineTask} from '../../createTask';

const action = (props, actor) => {
  return actor.attemptsTo(
    Enter.theValue(props.itemName)
      .into(TodoList.What_Needs_To_Be_Done)
      .thenHit(Key.ENTER)
  )
};

export const AddATodoItem =
  defineTask()
    .describe('{0} adds a Todo Item with kittens called #itemName')
    .defineAction(action)
    .defineProps({called: 'itemName'})
    .finalize();
