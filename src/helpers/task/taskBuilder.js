import {extend, merge, mapValues, chain, partial} from 'lodash';
import {createTask} from './createTask';
import {createConstructorShortcuts} from './setters';
import {chainActions} from './builder';

export function defineTask() {
  const config = {
    props: {},
    annotation: null,
    actions: []
  };

  return createBuilder(config);
}

function createBuilder(config) {
  const {props, annotation, actions} = config;

  let finalized;

  function builder() {
    if (!finalized) {
      finalized = finalize(builder);
    }
    return finalized();
  }

  extend(builder, {
    props,
    annotation,
    actions,
    addActions: partial(addActions, builder),
    describe: partial(describe, builder),
    defineProps: partial(defineProps, builder)
  });

  extend(builder, createConstructorShortcuts(builder, builder.props));

  return builder;
}

function addActions(builder, ...newActions) {
  const {props, annotation, actions} = builder;
  return createBuilder({
    props,
    annotation,
    actions: actions.concat(newActions)
  });
}

function describe(builder, annotation) {
  const {props, actions} = builder;
  return createBuilder({
    props,
    annotation: annotation,
    actions
  });
}

function defineProps(builder, newProps) {
  const {props, annotation, actions} = builder;
  return createBuilder({
    props: merge({}, props, newProps),
    annotation,
    actions
  });
}

function finalize(builder) {
  const {props, annotation, actions} = builder;

  return createTask(annotation, props, function(actor) {
    // 'this' is instance of constructed SerenityJS Task
    return chainActions(actions, this, actor);
  });
}
