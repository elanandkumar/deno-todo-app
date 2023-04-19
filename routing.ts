import { Router } from "./deps.ts";
import getTodos from "./handlers/getTodos.ts";
import getTodo from "./handlers/getTodo.ts";
import addTodo from "./handlers/addTodo.ts";
import updateTodo from "./handlers/updateTodo.ts";
import deleteTodo from "./handlers/deleteTodo.ts";
const router = new Router();

router
  .get("/todos", getTodos)
  .get("/todos/:id", getTodo)
  .post("/todos", addTodo)
  .put("/todos/:id", updateTodo)
  .delete("/todos/:id", deleteTodo);

export default router;
