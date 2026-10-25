import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function inlineCssPlugin() {
  return {
    name: 'inline-css-plugin',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html;
      let newHtml = html;
      for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
        if (fileName.endsWith('.css') && chunk.type === 'asset') {
          const cssRegex = new RegExp(`<link[^>]*href="[^"]*${fileName}"[^>]*>`, 'g');
          newHtml = newHtml.replace(cssRegex, `<style>${chunk.source}</style>`);
          delete ctx.bundle[fileName];
        }
      }
      return newHtml;
    }
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), inlineCssPlugin()],
  server: {
    port: 5173
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov']
    }
  }
});
