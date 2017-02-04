import {step} from 'serenity-js/lib/screenplay-protractor';
import {decorate} from './decorate';

export function addTaskDescription(TaskConstructor, description) {
  decorate(TaskConstructor.prototype, 'performAs', step(description));
}
