
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 8080,
    host: true,
  },
  plugins: [
    react(),
    mdx({
      remarkPlugins: [remarkFrontmatter],
      providerImportSource: "@mdx-js/react"
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      external: [
        '@mdx-js/react',
        '@mdx-js/rollup',
        'remark-frontmatter'
      ]
    },
  },
  optimizeDeps: {
    exclude: ['@mdx-js/react', '@mdx-js/rollup']
  }
}));
