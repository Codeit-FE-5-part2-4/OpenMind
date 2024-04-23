// .eslintrc.js
const { FlatCompat } = require("@eslint/eslintrc");
const pluginJs = require("@eslint/js");
const globals = require("globals");

const compat = new FlatCompat({
  recommendedConfig: pluginJs.configs.recommended,
});

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", ...compat.extends()],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  globals: globals.browser,
};
