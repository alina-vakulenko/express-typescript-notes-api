import { JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest";

process.env.NODE_ENV = "test";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  modulePaths: ["src"],
  moduleNameMapper: pathsToModuleNameMapper({
    "app/*": ["app/*"],
    "env/*": ["env/*"],
    "data/*": ["data/*"],
    "config/*": ["config/*"],
    "repositories/*": ["repositories/*"],
    "services/*": ["services/*"],
    "routes/*": ["routes/*"],
    "middleware/*": ["middleware/*"],
    "helpers/*": ["helpers/*"],
  }),
};

export default jestConfig;
