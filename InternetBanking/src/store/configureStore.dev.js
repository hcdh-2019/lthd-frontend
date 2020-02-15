import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
// import ConfigURL from '../../config/config_url'
const configureStore = (preloadedState) => {
  const middleware = [thunk];
  // ConfigURL.LOG ? middleware.push(createLogger()) : null
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}

export default configureStore
