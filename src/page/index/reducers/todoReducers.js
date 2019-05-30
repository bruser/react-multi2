import { ADD_TODO } from '../actions/actionsTypes';
    
const initialState = {
      todoList: []
};

const addTodo = (state, action) => {

  return { ...state, todoList: state.todoList.concat(action.obj) }
}

const todoReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TODO: return addTodo(state, action);
    default: return state;
  }
};
export default todoReducer;