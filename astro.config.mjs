// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
// import keystatic from "@keystatic/astro"; // 서버 사이드 기능이므로 제거
// import db from "@astrojs/db"; // 서버 사이드 기능이므로 제거
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  // The `site` property specifies the base URL for your site.
  // Be sure to update this to your own domain (e.g., "https://yourdomain.com") before deploying.
  site: "https://your-school-domain.com", // 학교 도메인으로 변경하세요
  prefetch: true,
  trailingSlash: "never",
  experimental: {
    clientPrerender: true,
  },
  integrations: [
    react(),
    markdoc(),
    // ...(process.env.SKIP_KEYSTATIC ? [] : [keystatic()]), // 서버 사이드 기능이므로 제거
    // db(), // 서버 사이드 기능이므로 제거
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "static", // static 사이트 생성으로 변경
});
