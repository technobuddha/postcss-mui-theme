// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { lint } from '@technobuddha/project';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  lint({
    files: ['**/*.ts'],
    ignores: ['__tests__/**/*', '@types/**/*'],
    environment: 'node',
    typescript: true,
  }),
]);
