export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 30000,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**'],
    modulePathIgnorePatterns: ['lib', 'src/index.ts', 'type.ts'],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageThreshold: {
        global: {
            lines: 100,
        },
    },
};
