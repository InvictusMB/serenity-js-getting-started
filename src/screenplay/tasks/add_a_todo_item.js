import {step, Enter} from 'serenity-js/lib/screenplay-protractor';
import {decorate} from '../../decorate';
import {Key} from 'protractor';
import * as TodoList from '../ui/todo_list';

export function AddATodoItem(itemName) {
  this.itemName = itemName;
}

AddATodoItem.prototype = {
  performAs: function(actor) {
    return actor.attemptsTo(
      Enter.theValue(this.itemName)
        .into(TodoList.What_Needs_To_Be_Done)
        .thenHit(Key.ENTER)
    );
  }
};

AddATodoItem.called = function(itemName) {
  return new AddATodoItem(itemName);
};

decorate(AddATodoItem.prototype, "performAs", step('{0} adds a Todo Item with kittens called #itemName'));
