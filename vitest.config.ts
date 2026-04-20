// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test*.ts'],
    globals: true,
    environment: 'jsdom',
    env: {
      TZ: 'America/New_York',
    },
    cache: false as const,
    typecheck: {
      enabled: true,
    },
    coverage: {
      reportsDirectory: './coverage',
      skipFull: true,
      enabled: true,
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/*.test.*',
        '**/*.config.*',
        'scripts/**/*.*',
        '**/index.ts',
        '**/@types',
        '**/@data',
        
      ],
    },
  },
}));
