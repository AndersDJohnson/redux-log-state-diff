# redux-log-state-diff-middleware

Ever wonder which action resulted in a change to some part of your Redux state?

Introducing a debugging tool that logs a state diff and action type
when specified parts of the state change,
according to provided state paths or predicate functions.

```
logStateDiffMiddleware(pathsAndPredicates, options)
```

```js
import logStateDiffMiddleware from 'redux-log-state-diff-middleware'

createStore(
  reducer,
  applyMiddleware(
    logStateDiffMiddleware([
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
redux-log-state-diff-middleware: action "SOME_ACTION_TYPE", predicate "subState.path" {...a state diff object..}
```

If you want to be able to control which values are logged at runtime, you could wire up a query parameter:

```js
import {logStateDiffMiddlewareParams } from 'redux-log-state-diff-middleware'

createStore(
  reducer,
  applyMiddleware(
    logStateDiffMiddlewareParams()
  )
)
```

Then hit your app with a `__REDUX_LOG_STATE_DIFF__` query parameter with comma-separated state paths:\
https://localhost:8000/my/path?__REDUX_LOG_STATE_DIFF__=subState.path,otherSubPath.somewhere

and it will act as if you had configured with these state paths:

```js
logStateDiffMiddleware([
  'subState.path',
  'otherSubPath.somewhere',
])
```

`logStateDiffMiddlewareParams` accepts the same arguments as `logStateDiffMiddleware`,
where `pathsAndPredicates` (which will be merged with params-derived ones), and `options`.
