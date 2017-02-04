import {extend, mapValues} from 'lodash';
import {addTaskDescription} from './addTaskDescription';

export function createTask(description, setters, performAs) {
  function Task() {
    if(!this) {
      return new Task();
    }
  }
  Task.prototype.performAs = performAs;
  addChainingSetters(Task.prototype, setters);
  addConstructorShortcuts(Task, setters);
  addTaskDescription(Task, description);
  return Task;
}

function addChainingSetters(target, setters) {
  extend(target, mapValues(setters, propertyName => function(value) {
    this[propertyName] = value;
    return this;
  }));
}

function addConstructorShortcuts(Constructor, setters) {
  extend(Constructor, mapValues(setters, (propertyName, setter) => value => {
    return new Constructor()[setter](value);
  }));
}
