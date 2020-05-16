import { deleteTodo, getTodo } from "../services/todos.ts";

export default async (
  { params, response }: { params: { id: string }; response: any },
) => {
  const todoId = params.id;

  if (!todoId) {
    response.status = 400;
    response.body = { msg: "Invalid user id" };
    return;
  }

  const todo = await (getTodo(todoId));
  if (!todo) {
    response.status = 404;
    response.body = { msg: `Todo with ID ${todoId} not found` };
    return;
  }

  await deleteTodo(todoId);

  response.body = { msg: "Todo deleted" };
};
