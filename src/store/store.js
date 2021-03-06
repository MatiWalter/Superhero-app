import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import { authReducer } from "../reducers/authReducer";
import { heroReducer } from "../reducers/heroReducer";
import { uiReducer } from "../reducers/uiReducer";

const composeEnhancers = (typeof window !== 'undefined'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;

const reducers = combineReducers({
  user: authReducer,
  team: heroReducer,
  ui: uiReducer
});

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);