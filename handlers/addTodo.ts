import { addTodo } from "../services/todos.ts";

export default async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid todo data" };
    return;
  }

  const { type, value } = await request.body();

  let todoData = value;
  if (type === "text") {
    todoData = JSON.parse(value);
  }

  const { task, isDone, priority } = todoData;
  if (!task) {
    response.status = 422;
    response.body = { msg: "Incorrect todo data. Task is required!" };
    return;
  }

  const todoId = await addTodo({ task, isDone, priority });

  response.body = { msg: "Todo added", todoId };
};
