import { JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  // contains a set of configuration options for Jest, such as the test environment, the test runner, and the test file patterns.
  preset: "ts-jest",
  // allows you to specify the environment in which your tests will run.
  testEnvironment: "node",
  // allows you to specify the file patterns for Jest to search for test files.
  testMatch: ["**/**/*.test.ts"],
  // determines the amount of output produced by Jest during test runs.
  verbose: true,
  // determines whether Jest should forcibly terminate the test run once all tests have completed, regardless of whether any asynchronous operations are still pending.
  forceExit: true,
  // determines whether Jest should automatically clear mock calls and instances between tests.
  clearMocks: true,
  // determines whether Jest should reset all mocks between tests.
  resetMocks: true,
  // determines whether Jest should automatically restore all mocks that were manually mocked using jest.mock() after each test.
  restoreMocks: true,
  // allows you to specify an array of directory paths to be searched for modules when running tests.
  modulePaths: ["src"],
  // allows you to specify module name mappings for modules that cannot be directly imported by their name.
  moduleNameMapper: pathsToModuleNameMapper({
    "app/*": ["app/*"],
    "env/*": ["env/*"],
    "data/*": ["data/*"],
    "config/*": ["config/*"],
    "repositories/*": ["repositories/*"],
    "services/*": ["services/*"],
    "routes/*": ["routes/*"],
    "validations/*": ["validations/*"],
    "middleware/*": ["middleware/*"],
    "helpers/*": ["helpers/*"],
  }),
};

export default jestConfig;
