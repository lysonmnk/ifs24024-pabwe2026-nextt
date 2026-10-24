import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'src',
    include: ['**/*.test.js'],
    environment: 'node'
  }
});
