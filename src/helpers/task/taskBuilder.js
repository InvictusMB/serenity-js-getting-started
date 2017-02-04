import {createBuilder} from './builder';

export function defineTask() {
  const config = {
    props: {},
    annotation: null,
    actions: []
  };

  return createBuilder(config);
}
