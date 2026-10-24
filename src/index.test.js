import { describe, it, expect } from 'vitest';
import { appName } from './index.js';

describe('appName', () => {
  it('should match project name', () => {
    expect(appName).toBe('ifs24024-pabwe2026-proyek1');
  });
});
