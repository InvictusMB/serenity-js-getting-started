import {merge} from 'lodash';
import {createBuilder} from './createBuilder';

export function addActions(builder, ...newActions) {
  const {setters, annotation, actions} = builder;
  return createBuilder({
    setters,
    annotation,
    actions: actions.concat(newActions)
  });
}

export function annotate(builder, annotation) {
  const {setters, actions} = builder;
  return createBuilder({
    setters,
    annotation: annotation,
    actions
  });
}

export function defineSetters(builder, newProps) {
  const {setters, annotation, actions} = builder;
  return createBuilder({
    setters: merge({}, setters, newProps),
    annotation,
    actions
  });
}
