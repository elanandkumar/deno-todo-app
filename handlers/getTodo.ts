import { getTodo } from "../services/todos.ts";
export default async (
  { params, response }: { params: { id: string }; response: any },
) => {
  const todoId = params.id;

  if (!todoId) {
    response.status = 400;
    response.body = { msg: "invalid todo id" };
    return;
  }

  const todo = await getTodo(todoId);
  if (!todo) {
    response.status = 400;
    response.body = { msg: `Todo with ID ${todoId} not found!` };
    return;
  }

  response.body = todo;
};
