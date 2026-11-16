import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import playwright from "eslint-plugin-playwright";

export default defineConfig([
  {
    ignores: [
      "node_modules/",
      "playwright-report/",
      "test-results/",
      "blob-report/",
      "playwright/.auth/",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  {
    ...playwright.configs["flat/recommended"],
    files: ["tests/**/*.ts"],
  },
]);
