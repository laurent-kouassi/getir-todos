import React, { Fragment, useState, useEffect} from 'react';
import { Todos } from '../components/Todos';
import { TodoForm } from '../components/TodoForm';
import { todos, todoCompleted } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

export const Home = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const [completedHidden, setCompletedHidden] = useState();

  const dispatch = useDispatch();
  const todosList = useSelector(state => state.todos);

  // toggle to complete todo
  const toggleChecked = (id) => {
    todosList.filter(todo => {
      if(todo.id === id) return todo.completed == !todo.completed;
    });

    // dispatch(
    //   todoCompleted(id)
    // );
  };

  // delete todo
  const deleteTodo = id => {
    dispatch(
      deleteTodo(
        id,
        error => alert(error)
      )
    );
  };

// pending todo to complete
const pendingTodo = () => {
  return todosList && todosList.filter(todo => todo.completed === false).length
};

// get todos list
useEffect(() => {
    dispatch(
        todos()
    );
}, [todosList]);

//update on hide button toogle
useEffect(() => {
  if(hideCompleted){
    setCompletedHidden(todosList && todosList.filter(todo => todo.completed === false));
  }
}, [hideCompleted]);

// render ui
  return (
    <div className="app">
      <div className="header">
        <div className="app-bar">
          <div className="app-header">
            <h1>
             Getir - Todo ( { pendingTodo() } )
            </h1>
          </div>
        </div>
      </div>
      <div className="main">
        <Fragment>
           <TodoForm />

           <div className="filter">
            <button onClick = {() => setHideCompleted(!hideCompleted)}>
               {hideCompleted ? "show All" : "Hide Completed"}
             </button>
           </div>
          
           <ul className="tasks">
                { 
                  todosList && !hideCompleted ?
                    todosList?.map(todo => <Todos key={ todo.id } todo={ todo } onCheckboxClick ={toggleChecked} onDeleteClick ={deleteTodo}/>) :
                    completedHidden?.map(todo => <Todos key={ todo.id } todo={ todo } onCheckboxClick ={toggleChecked} onDeleteClick ={deleteTodo}/>)
                }
           </ul>
        </Fragment>
      </div>
    </div>
    );
};
