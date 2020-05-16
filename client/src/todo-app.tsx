import React, { useEffect } from "react";
// import AddTodo from "./components/add-todo";
import TodosList from "./components/todos-list";
import { API_URL_TODOS } from './constants';
// import AddTodo from "./components/add-todo";
import { store, AppContextProvider, AppContextInterface } from './AppContext';
import AddTodo from "./components/add-todo";
import Todo from "./types/todo";

const TodoApp = () => {
  const [todoAppContext, setTodoAppContext] = React.useState<AppContextInterface>({...store});

  const handleAddTodo = async (task: string, priority: string="low") => {
    try {
      const todo: Todo = {
        id: '',
        task,
        isDone: false,
        priority
      }
      const response = await fetch(API_URL_TODOS, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const { todoId } = await response.json();
      if(!todoId) {
        throw new Error('Failed to add new task.');
      } else {
        todo.id = todoId;
      }
      setTodoAppContext({todos: [...todoAppContext.todos, todo]});

    } catch (e) {
      console.error(e);
    }
  }

  const handleDeleteTodo = async (todoId: string) => {
    try {
      const response = await fetch(`${API_URL_TODOS}/${todoId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': "application/json",
          'Accept': "application/json"
        }
      });
      await response.json();
      const filteredTodos = todoAppContext.todos.filter(todo => todo.id !== todoId);
      setTodoAppContext({todos: [...filteredTodos]});
    }catch(e) {
      console.error(e);
    }
  }

  const handleUpdateTodo = async (todoId: string, { isDone }: { isDone: boolean}) => {
    try {
      const response = await fetch(`${API_URL_TODOS}/${todoId}`, {
        method: 'PUT',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isDone
        })
      });

      await response.json();

      const updatedTodos = todoAppContext.todos.map(todo => {
        if(todo.id === todoId) {
          console.log("matched...");
          return {
            ...todo,
            isDone
          };
        }
        return todo;
      });
      setTodoAppContext({todos: updatedTodos});

    } catch (error) {
      console.error(error);
    }
  }

  const initialState:AppContextInterface = {
    ...todoAppContext,
    addTodo: handleAddTodo,
    deleteTodo: handleDeleteTodo,
    updateTodo: handleUpdateTodo
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(API_URL_TODOS);
      const todos = await response.json();

      setTodoAppContext({todos});
    }

    fetchData();
  }, []);

  return (
    <AppContextProvider value={initialState}>
      <AddTodo />
      <TodosList />
    </AppContextProvider>
  );
};

export default TodoApp;
