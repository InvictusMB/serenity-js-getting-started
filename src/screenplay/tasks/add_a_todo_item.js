import {Enter} from 'serenity-js/lib/screenplay-protractor';
import {Key} from 'protractor';
import * as TodoList from '../ui/todo_list';

import {defineTask} from '../../helpers';

const addATodoItemAction = (actor, {itemName}) => actor.attemptsTo(
  Enter.theValue(itemName)
    .into(TodoList.What_Needs_To_Be_Done)
    .thenHit(Key.ENTER)
);

export const AddATodoItem =
  defineTask()
    .annotate('{0} adds a Todo Item with kittens called #itemName')
    .addActions(addATodoItemAction)
    .defineSetters({called: 'itemName'});
