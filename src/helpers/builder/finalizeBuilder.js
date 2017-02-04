import {createTask} from '../task';
import {chainActions} from './chainActions';

export function finalize(builder) {
  const {setters, annotation, actions} = builder;

  return createTask(annotation, setters, function(actor) {
    // 'this' is instance of constructed SerenityJS Task
    return chainActions(actions, actor, this);
  });
}
