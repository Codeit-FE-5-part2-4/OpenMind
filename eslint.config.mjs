import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import { fileURLToPath } from "url";
import path from "path";

// CommonJS 변수를 모방합니다 -- CommonJS를 사용하지 않을 경우 필요하지 않습니다.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

const eslintConfig = [
  { languageOptions: { globals: globals.browser } },
  ...compat.extends("airbnb"),
];

export default eslintConfig;
