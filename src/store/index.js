import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { todosReducer } from './reducers';

const thunkMiddleware = thunk;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(todosReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
