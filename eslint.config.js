// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { lint } from '@technobuddha/project';

export default lint(
  { files: ['*.config.js'], platform: 'node' },
  { files: ['*.config.ts', '*.setup.ts'], platform: 'node', typescript: true },
);
