import { getTodos } from "../services/todos.ts";

export default async ({ response }: { response: any }) => {
  response.body = await getTodos();
};
