import React from "react";
import { ctxt } from "../AppContext";
import Todo from "../types/todo";
import TodoItem from "./list-item";

const TodosList: React.FC = () => {
  const {todos} = React.useContext(ctxt);

  if(!todos || todos.length <= 0) {
    return <p>Hi there! Add a task to list it down here.</p>
  }
  return (
    <ul>
      {todos.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};

export default TodosList;
