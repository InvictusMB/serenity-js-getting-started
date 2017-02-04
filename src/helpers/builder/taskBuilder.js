import {createBuilder} from './createBuilder';

export function defineTask() {
  const config = {
    setters: {},
    annotation: null,
    actions: []
  };

  return createBuilder(config);
}
