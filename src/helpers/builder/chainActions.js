import _, {chain, partial} from 'lodash';

export function chainActions(actions, actor, props) {
  return chain(actions)
    .map(partial(bindToActor, _, actor, props))
    .reduce((chain, action) => chain.then(action), Promise.resolve())
    .value();
}

function bindToActor(action, actor, props) {
  if (isTask(action)) {
    return bindTask(action, actor);
  }
  return bindAction(action, actor, props);
}

function isTask(action) {
  return !!action.performAs;
}

function bindTask(action, actor) {
  return () => actor.attemptsTo(action);
}

function bindAction(action, actor, props) {
  return partial(action, actor, props);
}
