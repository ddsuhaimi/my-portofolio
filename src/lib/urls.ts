/** Join an internal URL without losing a configured deployment prefix. */
export function withBase(path: string, base = "/") {
  const prefix = `/${base.replace(/^\/+|\/+$/g, "")}`.replace(/\/$/, "");
  return `${prefix}/${path.replace(/^\/+/, "")}`;
}
export function absoluteUrl(path: string, site: string, base = "/") {
  return new URL(withBase(path, base), new URL(site).origin).href;
}
