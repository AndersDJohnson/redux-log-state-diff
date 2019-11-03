import get from "lodash/get";
import { diff } from "deep-object-diff";

const defaultLog = ({ action, diff, predicate }) => {
  console.log(
    `redux-log-state-diff: action "${action.type}", predicate ${
      predicate.str ? `"${predicate.str}"` : "function"
    }`,
    diff
  );
};

const getPredicate = p => (prevState, nextState) =>
  get(prevState, p) !== get(nextState, p);

const logStateDiff = (predicates, options = {}) => {
  const { log = defaultLog } = options;

  predicates = predicates.map(p =>
    typeof p !== "string" ? { fn: p } : { fn: getPredicate(p), str: p }
  );

  return store => next => action => {
    const { getState } = store;
    const prevState = getState();
    next(action);
    const nextState = getState();

    const matchingPredicate = predicates.find(p => p.fn(prevState, nextState));

    if (matchingPredicate) {
      const diffed = diff(prevState, nextState);
      log({
        action,
        predicate: matchingPredicate,
        diff: diffed,
        prevState,
        nextState
      });
    }
  };
};

const logStateDiffParams = (predicates, options) =>
  logStateDiff(
    [
      ...predicates,
      ...(typeof window === "undefined"
        ? []
        : (
            new URLSearchParams(window.location.search).get(
              "__REDUX_LOG_STATE_DIFF__"
            ) || ""
          ).split(","))
    ],
    options
  );

export { logStateDiffParams };

export default logStateDiff;
