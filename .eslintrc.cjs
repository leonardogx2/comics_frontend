// .eslintrc.cjs
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "no-unused-vars": "off", // Desativa a regra do ESLint
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_" }], // Desativa para variáveis iniciadas com '_'
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
