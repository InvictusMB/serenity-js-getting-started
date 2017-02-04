import {createTask} from '../task';
import {chainActions} from './chainActions';

export function finalize(builder) {
  const {props, annotation, actions} = builder;

  return createTask(annotation, props, function(actor) {
    // 'this' is instance of constructed SerenityJS Task
    return chainActions(actions, this, actor);
  });
}
