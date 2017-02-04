import {extend} from 'lodash';
import {annotateTask} from './annotateTask';
import {createSetters, createConstructorShortcuts} from '../setters';

export function createTask(description, setters, performAs) {
  function Task() {}
  Task.prototype.performAs = performAs;
  extend(Task.prototype, createSetters(setters));
  extend(Task, createConstructorShortcuts(Task, setters));
  annotateTask(Task, description);
  return Task;
}
