import {extend, mapValues} from 'lodash';
import {step} from 'serenity-js/lib/screenplay-protractor';
import {decorate} from './decorate';

export function createTask(description, setters, performAs) {
  function Task() {}
  extend(Task.prototype, mapValues(setters, propertyName => function(value) {
    this[propertyName] = value;
    return this;
  }));
  extend(Task, mapValues(setters, (propertyName, setter) => value => {
    return new Task()[setter](value);
  }));
  Task.prototype.performAs = performAs;
  decorate(Task.prototype, 'performAs', step(description));
  return Task;
}
