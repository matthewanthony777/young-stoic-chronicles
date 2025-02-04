
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from 'remark-frontmatter';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 8080,
    host: true, // This will allow proper network access
  },
  plugins: [
    {
      ...mdx({
        jsx: true,
        providerImportSource: "@mdx-js/react",
        jsxRuntime: "automatic",
        remarkPlugins: [remarkFrontmatter],
      }) as any,
      enforce: 'pre' as const
    },
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ['@mdx-js/react', '@mdx-js/rollup']
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
}));
