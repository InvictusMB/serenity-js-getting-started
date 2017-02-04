var  Enter = require('serenity-js/lib/screenplay-protractor').Enter;    // imports the @step
var  step = require('serenity-js/lib/screenplay-protractor').step;    // imports the @step

var protractor = require('protractor');

var TodoList  = require('../ui/todo_list').TodoList;

function AddATodoItem(itemName) {
    this.itemName = itemName;
}

AddATodoItem.prototype = {
  performAs: function(actor) {
    return actor.attemptsTo(
      Enter.theValue(this.itemName)
        .into(TodoList.What_Needs_To_Be_Done)
        .thenHit(protractor.Key.ENTER)
    );
  }
};

AddATodoItem.called = function(itemName) {
  return new AddATodoItem(itemName);
};

decorate(AddATodoItem.prototype, "performAs", step('{0} adds a Todo Item with kittens called #itemName'));

function decorate(target, property, decorator) {
  Object.defineProperty(target, property,
    decorator(
      target, property, Object.getOwnPropertyDescriptor(target, property)
    )
  )
}

module.exports = AddATodoItem;
