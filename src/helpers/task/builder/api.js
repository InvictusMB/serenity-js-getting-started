import {createBuilder} from './createBuilder';

export function addActions(builder, ...newActions) {
  const {props, annotation, actions} = builder;
  return createBuilder({
    props,
    annotation,
    actions: actions.concat(newActions)
  });
}

export function describe(builder, annotation) {
  const {props, actions} = builder;
  return createBuilder({
    props,
    annotation: annotation,
    actions
  });
}

export function defineProps(builder, newProps) {
  const {props, annotation, actions} = builder;
  return createBuilder({
    props: merge({}, props, newProps),
    annotation,
    actions
  });
}
