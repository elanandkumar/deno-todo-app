import { fetchData, persistData } from "./db.ts";
import { Todo } from "../models/todo.ts";
import createId from "../services/createId.ts";

type TodoData = Pick<Todo, "task" | "isDone" | "priority">;

export const getTodos = async (): Promise<Todo[]> => {
  const todos = await fetchData();
  return todos.sort((a, b) => a.task.localeCompare(b.task));
};

export const getTodo = async (todoId: string): Promise<Todo | undefined> => {
  const todos = await fetchData();
  return todos.find(({ id }) => id === todoId);
};

export const addTodo = async (todoData: TodoData): Promise<string> => {
  const todos = await fetchData();

  const newTodo: Todo = {
    id: await createId(),
    task: String(todoData.task),
    priority: todoData.priority !== undefined
      ? String(todoData.priority).toLowerCase()
      : "low",
    isDone: todoData.isDone || false,
    added: new Date(),
  };

  await persistData([...todos, newTodo]);

  return newTodo.id;
};

export const updateTodo = async (
  todoId: string,
  todoData: TodoData,
): Promise<void> => {
  const todo = await getTodo(todoId);

  if (!todo) {
    throw new Error("Todo not found!");
  }

  const updatedTodo = {
    ...todo,
    task: todoData.task !== undefined ? String(todoData.task) : todo.task,
    isDone: todoData.isDone !== undefined
      ? Boolean(todoData.isDone)
      : todo.isDone,
    priority: todoData.priority !== undefined
      ? String(todoData.priority).toLowerCase()
      : todo.priority,
  };

  const todos = await fetchData();
  const filteredTodos = todos.filter((todo) => todo.id !== todoId);

  persistData([...filteredTodos, updatedTodo]);
};

export const deleteTodo = async (todoId: string): Promise<void> => {
  const todos = await fetchData();
  const filteredTodos = todos.filter((todo) => todo.id !== todoId);

  persistData(filteredTodos);
};
