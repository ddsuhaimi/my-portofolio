const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function asset(path: string) {
	return `${base}/${path.replace(/^\//, "")}`;
}

export function route(path: string) {
	if (path === "/") return `${base}/`;
	return `${base}/${path.replace(/^\//, "")}`;
}
