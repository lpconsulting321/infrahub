/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  preview: {
    port: 3000,
    host: "0.0.0.0",
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "lcovonly"],
      include: ["tests/**"],
      exclude: [
        "node_modules/",
        "mocks/",
        "cypress/",
        "**/**.d.ts",
        "**/tests/**",
        "**/**component-preview",
      ],
      all: true,
    },
  },
});
