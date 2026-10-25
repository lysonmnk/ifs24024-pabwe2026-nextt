const fs = require('fs');
const path = require('path');

// Clean up subproject node_modules in CI/Jenkins environments so zip packaging stays small
const isCI = Boolean(
  process.env.JENKINS_HOME ||
  process.env.BUILD_NUMBER ||
  process.env.CI ||
  process.env.DELCOM
);

if (isCI) {
  const rootDir = path.resolve(__dirname, '..');
  const dirs = [
    path.join(rootDir, 'frontend', 'node_modules')
  ];

  for (const dir of dirs) {
    try {
      if (fs.existsSync(dir)) {
        console.log(`[cleanup] Removing ${dir} ...`);
        fs.rmSync(dir, { recursive: true, force: true });
        console.log(`[cleanup] Removed ${dir}`);
      }
    } catch (err) {
      console.warn(`[cleanup] Could not remove ${dir}: ${err.message}`);
    }
  }
}
