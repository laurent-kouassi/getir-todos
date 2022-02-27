import TYPES from '../types';

const initialState = {
    todos: '',
};

// reducer handler update todos state with new action data
export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.TODOS:
            return {...state, todos: action.payload};
        case TYPES.ADD_TODO:
            return {...state, todos: [...state.todos, action.payload]}
        case TYPES.DELETE_TODO:
            return {...state, todos: state.todos.filter(todo => todo.id !== action.payload)}
        case TYPES.TODO_COMPLETED:
            return { todos: state.todos.map(todo => todo.id == action.payload ? !todo.completed : todo )};
        default:
            return state;
    }
};