import {step} from 'serenity-js/lib/screenplay-protractor';
import {decorate} from '../interop';

export function addTaskDescription(TaskConstructor, description) {
  decorate(TaskConstructor.prototype, 'performAs', step(description));
}
