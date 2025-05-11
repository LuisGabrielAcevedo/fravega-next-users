import type { Config } from "jest";
import nextJest from "next/jest.js";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/*.d.ts",
    "!src/**/__tests__/**",
    "!src/**/types/**",
    "!src/**/interfaces/**",
    "!src/**/styles/**",
    "!src/**/index.ts",
  ],
};

const createJestConfig = nextJest({
  dir: "./",
});

export default createJestConfig(config);
