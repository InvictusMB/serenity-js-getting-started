import {step} from 'serenity-js/lib/screenplay-protractor';
import {decorate} from '../interop';

export function annotateTask(TaskConstructor, description) {
  decorate(TaskConstructor.prototype, 'performAs', step(description));
}
