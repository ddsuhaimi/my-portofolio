// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Root by default for local previews; GitHub Pages keeps its existing path.
const site = process.env.SITE_URL || "https://ddsuhaimi.github.io";
const base =
  process.env.BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" ? "/my-portofolio" : "/");
export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  vite: { plugins: [tailwindcss()] },
  image: { service: { entrypoint: "astro/assets/services/sharp" } },
});
