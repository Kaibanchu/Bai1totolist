import './CSS/todo.css';
import {  useEffect, useRef } from 'react'
import { useState } from 'react';
import TodoItems from './TodoItems';
let count = 0;
const Todo = () => {
    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);
    const add = () => {
        setTodos([...todos, {no:count++, text:inputRef.current.value, display:""}]);
        inputRef.current.value ="";
        localStorage.setItem("todos_count", count)
    }
    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem('todos')));
        count= localStorage.getItem('todos_count');
    }, []) // Để tải lại trang mà không mất dữ liệu trong local 
    //thì ta đưa dữ liệu đã chuyển sang array bằng JSON Parse vào setTodos

    useEffect(() => {console.log(todos)
        localStorage.setItem('todos', JSON.stringify(todos)); // luu tru gia tri la chuoi 
    }, [todos]);

    return (
    <div className='todo'>
        <div className="todo-header">To-Do List</div>
            <div className="todo-add">
                <input ref={inputRef} type="text"  className="todo-input" placeholder="Add-Your-Tasks" />
                <div onClick={()=>{add()}} className="todo-add-btn">ADD</div>
            </div>   
        <div className="todo-list">
        {todos.map((item, index)=>{
       return <TodoItems setTodos={setTodos} key={index} no={item.no} display={item.display} text={item.text} />})}
        </div> 
    </div>
  )
};

export default Todo;
