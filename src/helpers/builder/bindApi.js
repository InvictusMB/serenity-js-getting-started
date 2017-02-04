import {partial} from 'lodash';
import * as api from './api';

export function bindApi(builder) {
  const addActions = partial(api.addActions, builder);
  const describe = partial(api.describe, builder);
  const defineProps = partial(api.defineProps, builder);
  return {
    addActions,
    describe,
    defineProps
  }
}
