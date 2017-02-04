import {extend} from 'lodash';
import {createConstructorShortcuts} from '../setters';
import {finalize} from './finalizeBuilder';
import {bindApi} from './bindApi';

export function createBuilder(config) {
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

    ...bindApi(builder)
  });

  extend(builder, createConstructorShortcuts(builder, builder.props));

  return builder;
}
