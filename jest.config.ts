import { JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  testPathIgnorePatterns: [
    "\\.fixture\\.ts$",
    "\\config\\.ts$",
    "\\utils\\.ts$",
  ],
  modulePaths: ["src"],
  moduleNameMapper: pathsToModuleNameMapper({
    "@app/*": ["app/*"],
    "@env/*": ["env/*"],
    "@config/*": ["config/*"],
    "@db/*": ["db/*"],
    "@schemas/*": ["schemas/*"],
    "@repositories/*": ["repositories/*"],
    "@controllers/*": ["controllers/*"],
    "@services/*": ["services/*"],
    "@routes/*": ["routes/*"],
    "@middleware/*": ["middleware/*"],
    "@helpers/*": ["helpers/*"],
  }),
};

export default jestConfig;
