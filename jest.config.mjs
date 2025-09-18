export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", {
      useESM: true,
      tsconfig: {
        target: "ES2022",
        module: "ES2022", 
        moduleResolution: "node",
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        skipLibCheck: true,
        types: ["jest", "node"],
        typeRoots: ["./tests/types.d.ts", "./node_modules/@types"]
      }
    }],
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/?(*.)+(spec|test).(ts|js)"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
};
