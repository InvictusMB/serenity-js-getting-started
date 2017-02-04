import {extend, mapValues} from 'lodash';
import {addTaskDescription} from './addTaskDescription';

export function createTask(description, setters, performAs) {
  function Task() {
    if(!this) {
      return new Task();
    }
  }
  extend(Task.prototype, mapValues(setters, propertyName => function(value) {
    this[propertyName] = value;
    return this;
  }));
  extend(Task, mapValues(setters, (propertyName, setter) => value => {
    return new Task()[setter](value);
  }));
  Task.prototype.performAs = performAs;
  addTaskDescription(Task, description);
  return Task;
}
