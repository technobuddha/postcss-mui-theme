// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { lint } from '@technobuddha/project';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  lint({ files: ['*.config.js'], environment: 'node' }),
  lint({ files: ['*.config.ts', '*.setup.ts'], environment: 'node', typescript: true }),
]);
