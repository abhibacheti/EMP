const eslintJestPlugin = require("eslint-plugin-jest")

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  extends: [],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/camelcase": ["off"],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-shadow": ["off"],
    "camelcase": "off",
    "class-methods-use-this": "off",
    "newline-before-return": 2,
    "no-shadow": "off",
    "require-await": "off",
  },
  overrides: [
    {
      files: ["tests/**/*"],
      env: {
        jest: true,
      },
      plugins: ["jest"],
      rules: {
        ...eslintJestPlugin.configs.recommended.rules,
        "jest/expect-expect": ["off"],
        "@typescript-eslint/ban-ts-ignore": ["off"],
        "@typescript-eslint/explicit-function-return-type": ["error"],
        "@typescript-eslint/no-non-null-assertion": ["error"],
      },
    },
  ],
}
