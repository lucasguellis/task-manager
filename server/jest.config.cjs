/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/test'],
    maxWorkers: 1,
    globalTeardown: './test/setup/tearDown.ts',
};
