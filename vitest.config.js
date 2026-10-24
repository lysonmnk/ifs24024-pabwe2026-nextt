import { defineConfig } from 'vitest/config';
import fs from 'fs';

function cleanupSubNodeModules() {
  const isCI = Boolean(
    process.env.JENKINS_HOME ||
    process.env.BUILD_NUMBER ||
    process.env.CI ||
    process.env.DELCOM
  );

  if (isCI) {
    const dirs = ['frontend/node_modules', 'backend/node_modules'];
    for (const d of dirs) {
      try {
        if (fs.existsSync(d)) {
          console.log(`[vitest-cleanup] Removing ${d} ...`);
          fs.rmSync(d, { recursive: true, force: true });
          console.log(`[vitest-cleanup] Removed ${d}`);
        }
      } catch (e) {
        console.warn(`[vitest-cleanup] Failed removing ${d}:`, e.message);
      }
    }
  }
}

export default defineConfig({
  test: {
    projects: [
      'backend/vitest.config.js',
      'frontend/vitest.config.js',
      'src/vitest.config.js'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage'
    },
    reporters: [
      'default',
      {
        onFinished() {
          cleanupSubNodeModules();
        }
      }
    ]
  }
});

