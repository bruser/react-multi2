import { createStore } from 'redux';
import todoReducer from './reducers/todoReducers';

const store = createStore(todoReducer);

export default store;  