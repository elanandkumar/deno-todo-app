import { v1 } from "../deps.ts";

export default async () => {
  try {
    // const NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

    return v1.generate();
  } catch (err) {
    console.error('unknown error occurred');
  }
}
