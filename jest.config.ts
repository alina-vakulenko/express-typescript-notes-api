import { JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  modulePaths: ["src"],
  moduleNameMapper: pathsToModuleNameMapper({
    "@app/*": ["app/*"],
    "@env/*": ["env/*"],
    "@config/*": ["config/*"],
    "@db/*": ["db/*"],
    "@schemas/*": ["schemas/*"],
    "@repositories/*": ["repositories/*"],
    "@services/*": ["services/*"],
    "@routes/*": ["routes/*"],
    "@middleware/*": ["middleware/*"],
    "@helpers/*": ["helpers/*"],
  }),
};

export default jestConfig;
