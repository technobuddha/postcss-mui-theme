// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { app } from '@technobuddha/project';

/** @type import('eslint').Linter.Config[] */
const config = [
  { ignores: ['coverage', 'dist'] },
  // .
  app.lint({ files: ['*.config.js'], ignores: [], environment: 'node' }),
  // .
  app.lint({
    files: ['*.config.ts', '*.setup.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'tsconfig.json',
  }),
  // src/__tests__
  app.lint({
    files: ['src/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/__tests__/tsconfig.json',
    jest: true,
  }),
  // src
  app.lint({
    files: ['src/**/*.ts'],
    ignores: ['src/__tests__/**/*'],
    environment: 'node',
    tsConfig: 'src/tsconfig.json',
  }),
];

export default config;
