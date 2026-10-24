import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'src',
    include: ['src/**/*.test.js'],
    environment: 'node'
  }
});
