import _, {chain, partial} from 'lodash';

export function chainActions(actions, props, actor) {
  return chain(actions)
    .map(partial(bindToActor, _, props, actor))
    .reduce((chain, action) => chain.then(action), Promise.resolve())
    .value();
}

function bindToActor(action, props, actor) {
  if (isTask(action)) {
    return bindTask(action, actor);
  }
  return bindAction(action, props, actor);
}

function isTask(action) {
  return !!action.performAs;
}

function bindTask(action, actor) {
  return () => actor.attemptsTo(action);
}

function bindAction(action, props, actor) {
  return partial(action, props, actor);
}
