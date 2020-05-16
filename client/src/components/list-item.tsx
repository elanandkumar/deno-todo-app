import React from "react";
import { ctxt } from "../AppContext";
import Todo from "../types/todo";

interface IProps {
    todo: Todo,
}

const renderPriority = (priority: string | undefined) => (priority && <div className={`priority ${priority}`}>{
    priority === 'high' ? '!!!' : priority === 'medium' ? "!!" : ''
}</div>)

const TodoItem: React.FC<IProps> = ({todo}) => {
    const { deleteTodo, updateTodo } = React.useContext(ctxt);
    const {id, priority, isDone, task} = todo;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateTodo && updateTodo(e.target.value, { isDone: e.target.checked });
    }

    const handleDelete = (e: React.FormEvent<HTMLButtonElement>) => {
        deleteTodo && deleteTodo(id);
    }

    return (<li className="todo-item">
        {renderPriority(priority)}
        <input className="input-checkbox" id={`cb_${id}`} type="checkbox" value={id} checked={isDone} onChange={handleOnChange} />
        <label htmlFor={`cb_${id}`} className={`task ${isDone ? 'done' : ''}`}>{task}</label>
        <button onClick={handleDelete} className="delete-btn">✘</button>
      </li>);
}

export default TodoItem;