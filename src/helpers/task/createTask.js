import {extend} from 'lodash';
import {addTaskDescription} from './addTaskDescription';
import {createSetters, createConstructorShortcuts} from './setters';

export function createTask(description, setters, performAs) {
  function Task() {
    if(!this) {
      return new Task();
    }
  }
  Task.prototype.performAs = performAs;
  extend(Task.prototype, createSetters(setters));
  extend(Task, createConstructorShortcuts(Task, setters));
  addTaskDescription(Task, description);
  return Task;
}
