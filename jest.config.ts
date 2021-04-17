/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  clearMocks: true,
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    roots: [
        "<rootDir>/src"
    ],
    testEnvironment: "node",
    testMatch: ['**/src/tests/**'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
};
