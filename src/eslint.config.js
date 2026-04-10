// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { lint } from '@technobuddha/project';

export default lint({
  files: ['**/*.ts'],
  ignores: ['__tests__/**/*', '@types/**/*'],
  platform: 'node',
  typescript: true,
});
