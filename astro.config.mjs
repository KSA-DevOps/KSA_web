// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
// import keystatic from "@keystatic/astro";
// import db from "@astrojs/db";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://ksa.su.hkust.edu.hk/",
  prefetch: true,
  trailingSlash: "never",
  experimental: {
    clientPrerender: true,
  },
  integrations: [
    react(),
    markdoc(),
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "static", // static 사이트 생성으로 변경
});
