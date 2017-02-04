import {noop, extend, mapValues} from 'lodash';
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

export function defineTask(action) {
  const builder = {
    props: {},
    annotation: null,
    performAs: noop || action,
    defineAction,
    defineProps,
    describe,
    finalize
  };

  return builder;

  function defineAction(action) {
    builder.performAs = action;
    return builder;
  }

  function defineProps(props) {
    builder.props = extend(builder.props, props);
    return builder;
  }

  function describe(annotation) {
    builder.annotation = annotation;
    return builder;
  }

  function finalize() {
    const {props, annotation, performAs} = builder;
    return createTask(annotation, props, function(actor) {
      return performAs(this, actor);
    });
  }
}
