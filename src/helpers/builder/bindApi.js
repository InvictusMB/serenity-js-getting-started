import {partial} from 'lodash';
import * as api from './api';

export function bindApi(builder) {
  const addActions = partial(api.addActions, builder);
  const annotate = partial(api.annotate, builder);
  const defineSetters = partial(api.defineSetters, builder);
  return {
    addActions,
    annotate,
    defineSetters
  }
}
