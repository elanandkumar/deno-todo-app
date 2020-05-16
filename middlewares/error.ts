import { TNext } from "../types/globalTypes.ts";
export default async ({ response }: { response: any }, next: TNext) => {
  try {
    await next();
  } catch (err) {
    response.status = 500;
    response.body = { msg: err.message };
  }
};
