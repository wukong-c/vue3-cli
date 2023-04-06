module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
    "eslint-config-prettier",
    "./config/.eslintrc-auto-import.json",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
    requireConfigFile: false,
    parser: "@babel/eslint-parser",
  },
  plugins: ["vue", "prettier"],
  rules: {
    "no-unused-vars": "warn",
    "vue/multi-word-component-names": "off",
  },
};
