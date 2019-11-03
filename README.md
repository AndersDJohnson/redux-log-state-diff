# redux-log-state-diff-middleware

Ever wonder which action resulted in a change to some part of your Redux state?

Introducing a debugging tool that logs a state diff and action type
when specified parts of the state change,
according to provided state paths or predicate functions.

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

Might log:

```
redux-log-state-diff-middleware matched SOME_ACTION_TYPE [ ...Diff... ]
```

If you want to control which values are logged at runtime, you could wire up a query parameter:

```js
import logStateDiffMiddleware from 'redux-log-state-diff-middleware'

createStore(
  reducer,
  applyMiddleware(
    logStateDiffMiddleware(
      typeof window === 'undefined' ? [] :
      new URLSearchParams(window.location.search).get('__REDUX_LOG_STATE_DIFF__').split(',')
    )
  )
)
```

Then hit your app at something like:\
https://localhost:8000/my/path?__REDUX_LOG_STATE_DIFF__=subState.path,otherSubPath.somewhere
