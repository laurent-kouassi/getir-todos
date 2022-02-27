import { Services } from '../../api/Services';
import TYPES from "../types";

// asynchronously dispatch action
export const todos = () => {
  return async (dispatch) => {
    const server = new Services();
    server
      .getTodos()
      .then(res => {
        dispatch({
          type: TYPES.TODOS,
          payload: res.entity,
        });
      })
      .catch(error => console.log(error));
  };
};

// add todo
export const addTodos = (onSuccess, onError) => {
  return async (dispatch) => {
    const server = new Services();
    server
      .postTodos()
      .then(res => {
        dispatch({
          type: TYPES.ADD_TODO,
          payload: res.entity,
        });
        onSuccess('todo added')
      })
      .catch(error => onError(error));
  };
};

//delete todo
export const deleteTodos = (id, onError) => {
  return async (dispatch) => {
    const server = new Services();
    server
      .deleteTodos(id)
      .then(res => {
        dispatch({
          type: TYPES.DELETE_TODO,
          payload: id,
        });
      })
      .catch(error => onError(error));
  };
};

// toogle to complete todo
export const todoCompleted = (id) => {
  return async (dispatch) => {
      dispatch({
        type: TYPES.TODO_COMPLETED,
        payload: id,
      });
  };
};