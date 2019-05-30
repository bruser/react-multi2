import { ADD_TODO } from './actionsTypes.js';

export const addTodo = (obj) => {
  return {
    type: ADD_TODO,
    obj: obj
  };
};