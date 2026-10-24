import { defineConfig } from 'vitest/config';
import fs from 'fs';
import path from 'path';

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

function ensureCoverageReport() {
  try {
    const rootCoverageDir = path.resolve(process.cwd(), 'coverage');
    if (!fs.existsSync(rootCoverageDir)) {
      fs.mkdirSync(rootCoverageDir, { recursive: true });
    }

    const frontendLcov = path.resolve(process.cwd(), 'frontend', 'coverage', 'lcov.info');
    const targetLcov = path.join(rootCoverageDir, 'lcov.info');

    if (fs.existsSync(frontendLcov)) {
      let content = fs.readFileSync(frontendLcov, 'utf8');
      content = content.replace(/\\/g, '/');
      fs.writeFileSync(targetLcov, content, 'utf8');
      console.log(`[coverage-sync] Generated ${targetLcov} for SonarQube (${content.length} bytes)`);
    }
  } catch (err) {
    console.warn(`[coverage-sync] Warning generating coverage:`, err.message);
  }
}

export default defineConfig({
  test: {
    projects: [
      'backend/vitest.config.js',
      'frontend/vitest.config.js'
    ],
    reporters: [
      'default',
      {
        onFinished() {
          ensureCoverageReport();
          cleanupSubNodeModules();
        }
      }
    ]
  }
});
