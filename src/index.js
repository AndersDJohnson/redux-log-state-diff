import get from "lodash.get";
import { diff } from "deep-diff";

const defaultLog = ({ action, diff }) =>
  console.log("redux-log-state-diff-middleware matched", action.type, diffed);

const getPredicate = p => (prevState, nextState) =>
  get(prevState, p) !== get(nextState, p);

const logStateDiffMiddleware = (predicates, options = {}) => {
  const { log = defaultLog } = options;

  predicates = predicates.map(p =>
    typeof p !== "string" ? p : getPredicate(p)
  );

  return store => next => action => {
    const { getState } = store;
    const prevState = getState();
    next(action);
    const nextState = getState();

    const match = predicates.some(p => p(prevState, nextState));

    if (match) {
      const diffed = diff(prevState, nextState);
      log({ action, diff: diffed, prevState, nextState });
    }
  };
};

export default logStateDiffMiddleware;
