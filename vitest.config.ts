import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import graphql from "@rollup/plugin-graphql";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), graphql()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./test/setup-test-env.ts"],
    include: ["./app/**/*.test.[jt]s?(x)"],
    watchExclude: [".*\\/node_modules\\/.*", ".*\\/build\\/.*"],
  },
});
