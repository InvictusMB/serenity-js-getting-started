import {extend, partial} from 'lodash';
import {createConstructorShortcuts} from '../setters';
import {addActions, describe, defineProps} from './api';
import {finalize} from './finalizeBuilder';

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
    addActions: partial(addActions, builder),
    describe: partial(describe, builder),
    defineProps: partial(defineProps, builder)
  });

  extend(builder, createConstructorShortcuts(builder, builder.props));

  return builder;
}
