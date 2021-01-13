import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { gameReducer, homeReducer } from './reducers';

const rootReducer = combineReducers({
  homeReducer,
  gameReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
