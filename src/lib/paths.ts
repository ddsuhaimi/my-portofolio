import { withBase } from "./urls";
export const route = (path: string) => withBase(path, import.meta.env.BASE_URL);
export const asset = route;
