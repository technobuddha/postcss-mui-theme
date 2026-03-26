// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { app } from '@technobuddha/project';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  app.lint({ files: ['**/*.test.ts'], environment: 'test', typescript: true }),
]);
