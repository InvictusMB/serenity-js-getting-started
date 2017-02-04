import {extend, memoize} from 'lodash';
import {createConstructorShortcuts} from '../setters';
import {finalize} from './finalizeBuilder';
import {bindApi} from './bindApi';

export function createBuilder(config) {
  const {props} = config;
  const cachedFinalize = memoize(finalize);

  function builder() {
    const Task = cachedFinalize(builder);
    return new Task();
  }

  extend(builder, {
    ...config,
    ...bindApi(builder),
    ...createConstructorShortcuts(builder, props)
  });
  
  return builder;
}
