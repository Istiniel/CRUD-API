export default {
  transform: {
    '^.+\\.ts?$': 'babel-jest',
  },
  injectGlobals: true,
  clearMocks: true,
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
}
