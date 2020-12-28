/* eslint-disable */
// To have different commands to run unit tests and integration tests
// https://medium.com/coding-stones/separating-unit-and-integration-tests-in-jest-f6dd301f399c
const { defaults } = require("jest-config/build/index")

module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  collectCoverage: false,
  collectCoverageFrom: [
    "**/*.ts",
    "!**/tests/**",
    "!**/node_modules/**",
    "!**/coverage/**",
  ],
  coveragePathIgnorePatterns: [
    // Covered by integration tests
    "src/app/lambdas/*",
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  coverageReporters: ["text", "html", "lcov"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["jest-allure/dist/setup", "<rootDir>/jest.env.ts"],
  reporters: ["default", "jest-allure"],
  verbose: true,
}
