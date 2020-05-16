import { Application, Context, send } from "./deps.ts";
import { HOST, PORT } from "./config.ts";
import router from "./routing.ts";
import notFound from "./handlers/notFound.ts";
import errorMiddleware from "./middlewares/error.ts";

const app = new Application();

app.use(errorMiddleware);

app.use(router.routes());
app.use(async (context: Context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
    index: "index.html",
  });
});

app.use(router.allowedMethods());
app.use(notFound);

const listenOptions = {
  port: Number(PORT),
};
console.log(`Listening on ${HOST}:${PORT}...`);
await app.listen(listenOptions);
