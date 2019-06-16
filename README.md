# redux-log-state-diff-middleware

A debugging tool that logs a state diff and action type
when some part of the state changes,
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
