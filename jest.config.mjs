const config = {
  testEnvironment: "node", // environment Node.js
  clearMocks: true, // reset mocks tiap test
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)", // hanya file di __tests__ folder dengan .test.ts/.test.js
    "**/?(*.)+(spec|test).[jt]s?(x)", // atau file yang mengandung .spec atau .test
  ],
  modulePathIgnorePatterns: [
    "<rootDir>/dist/", // abaikan folder dist
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
};

export default config;
