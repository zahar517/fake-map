import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import { usersWatcher as usersSaga } from "./sagas/users";

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  typeof window === "object" && window.devToolsExtension
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

export default () => {
  const store = createStore(rootReducer, enhancer);

  sagaMiddleware.run(usersSaga);

  return store;
};
