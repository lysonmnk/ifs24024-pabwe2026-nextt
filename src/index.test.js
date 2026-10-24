import { describe, it, expect } from 'vitest';
import { appName, getSessionToken } from './index.js';

describe('appName', () => {
  it('should match project name', () => {
    expect(appName).toBe('ifs24024-pabwe2026-proyek1');
  });

  it('should generate session token string', () => {
    const token = getSessionToken();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });
});
