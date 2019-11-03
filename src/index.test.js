import { createStore, applyMiddleware } from "redux";
import logStateDiff from ".";

const mockLog = () => jest.fn(({ action, diff }) => {
  console.log("diff", action.type, diff);
});

const reducer = (state = {}, action) => {
  if (action.payload)
    return {
      ...state,
      ...action.payload
    };
  return state;
};

const makeStore = (log, diffs) =>
  createStore(
    reducer,
    applyMiddleware(
      logStateDiff(diffs, {
        log
      })
    )
  );

describe("logStateDiff", () => {
  it("should work for two matching actions", () => {
    const log = mockLog();

    const store = makeStore(log, [
      (prevState, nextState) => prevState.other !== nextState.other,
      "test"
    ]);

    store.dispatch({
      type: "TEST",
      payload: {
        test: true
      }
    });

    store.dispatch({
      type: "OTHER",
      payload: {
        other: true
      }
    });

    expect(log).toHaveBeenCalledTimes(2);
  });

  it("should work for one matching action", () => {
    const log = mockLog();

    const store = makeStore(log, ["test"]);

    store.dispatch({
      type: "TEST",
      payload: {
        test: true
      }
    });

    store.dispatch({
      type: "OTHER",
      payload: {
        other: true
      }
    });

    expect(log).toHaveBeenCalledTimes(1);
  });
});
