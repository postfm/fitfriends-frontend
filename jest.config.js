/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
      "^.+\\.tsx?$": "ts-jest" 
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/mocks/test-mocks/file-mock.ts',
    '\\.(css|less)$': '<rootDir>/src/mocks/test-mocks/style-mock.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  globals: {
    window: {}
  }
}