# redux-log-state-diff
> Redux middleware to log actions that change given subsets of state

[![npm](https://img.shields.io/npm/v/redux-log-state-diff)](https://www.npmjs.com/package/redux-log-state-diff)

[![npm add redux-log-state-diff (copy)](https://copyhaste.com/i?t=npm%20add%20redux-log-state-diff)](https://copyhaste.com/c?t=npm%20add%20redux-log-state-diff "npm add redux-log-state-diff (copy)")
[![yarn add redux-log-state-diff (copy)](https://copyhaste.com/i?t=yarn%20add%20redux-log-state-diff)](https://copyhaste.com/c?t=yarn%20add%20redux-log-state-diff "yarn add redux-log-state-diff (copy)")

Ever wonder which action resulted in a change to some part of your Redux state?

Introducing a debugging tool that logs a state diff and action type
when specified parts of the state change,
according to provided state paths or predicate functions.

```
logStateDiff(pathsAndPredicates, options)
```

```js
import logStateDiff from 'redux-log-state-diff'

createStore(
  reducer,
  applyMiddleware(
    logStateDiff([
      'subState.path',
      'otherSubPath.somewhere',
      (prevState, nextState) => prevState.foo !== nextState.foo
    ])
  )
)
```

Now suppose an action `SOME_ACTION_TYPE` is dispatched that updates `state.subState.path`,
then the middleware might log:

```
redux-log-state-diff: action "SOME_ACTION_TYPE", predicate "subState.path" {...a state diff object..}
```

If you want to be able to control which values are logged at runtime, you could wire up a query parameter:

```js
import { logStateDiffParams } from 'redux-log-state-diff'

createStore(
  reducer,
  applyMiddleware(
    logStateDiffParams()
  )
)
```

Then hit your app with a `__REDUX_LOG_STATE_DIFF__` query parameter with comma-separated state paths:\
https://localhost:8000/my/path?__REDUX_LOG_STATE_DIFF__=subState.path,otherSubPath.somewhere

and it will act as if you had configured with these state paths:

```js
logStateDiff([
  'subState.path',
  'otherSubPath.somewhere',
])
```

`logStateDiffParams` accepts the same arguments as `logStateDiff`,
where `pathsAndPredicates` (which will be merged with params-derived ones), and `options`.
