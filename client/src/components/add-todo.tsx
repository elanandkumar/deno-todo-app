import React from "react";
// import { API_URL_TODOS } from "../constants";
import { ctxt } from "../AppContext";


const AddTodo: React.FC = () => {
  const { addTodo } = React.useContext(ctxt);
  const [task, setTask] = React.useState<string>("");
  const [priority, setPriority] = React.useState<string>("low");

  const addTodoHandler = () => {
    addTodo && addTodo(task, priority);
    setTask('');
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      addTodoHandler();
    }
  }

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setPriority(e.target.value);
  }

  return (
    <>
    <div className="add-todo">
      <input
        className="input-add"
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleOnKeyPress}
        autoFocus
      ></input>
      <button onClick={addTodoHandler} className="button-add">Add</button>
    </div>
    <div>
      <div>Task Priority:</div>
      <input id="rb_low" type="radio" value="low" checked={priority === 'low'} name="priority" onChange={handlePriorityChange} /><label htmlFor="rb_low">Low</label>
      <input id="rb_medium" type="radio" value="medium" checked={priority === 'medium'}  name="priority" onChange={handlePriorityChange} /><label htmlFor="rb_medium">Medium</label>
      <input id="rb_high" type="radio" value="high" checked={priority === 'high'}  name="priority" onChange={handlePriorityChange} /><label htmlFor="rb_high">High</label>
    </div>
    </>
  );
};

export default AddTodo;
