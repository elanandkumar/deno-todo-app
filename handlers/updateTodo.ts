import { updateTodo } from "../services/todos.ts";

export default async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const todoId = params.id;

  if (!todoId) {
    response.status = 400;
    response.body = { msg: "Invalid todo id" };
    return;
  }

  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid todo data" };
    return;
  }

  const {
    value: {task, isDone, priority},
  } = await request.body();

  await updateTodo(todoId, { task, isDone, priority });
  response.body = { msg: "Todo updated" };
};
