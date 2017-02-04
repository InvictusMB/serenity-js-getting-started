import {createBuilder} from './createBuilder';

export function defineTask() {
  const config = {
    props: {},
    annotation: null,
    actions: []
  };

  return createBuilder(config);
}
