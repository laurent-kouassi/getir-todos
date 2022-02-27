import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodos } from '../store/actions';

export const TodoForm = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        
        if(!text) return;

        let new_todo = {
            title: text, 
            completed: false
        };
        addTodo(new_todo);

        // reset input
        setText("");
    };

    // add todo
    const addTodo = data => {
        dispatch(
            addTodos(
                data,
                success => alert(success),
                error => alert(error)
            )
        );
    };
    //render 
    return (
        <form className= "task-form" onSubmit={ handleSubmit }>
            <input type="text" value={ text } onChange={e => setText(e.target.value)} placeholder="add todo"/>
            <button type="submit">Add Todo</button>
        </form>
    );
};