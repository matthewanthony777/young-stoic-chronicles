
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { mdxDataPlugin } from "./src/plugins/mdx-loader";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 8080,
    host: true, // This will allow proper network access
  },
  plugins: [
    {
      ...mdxDataPlugin({
        jsx: true,
        providerImportSource: "@mdx-js/react",
        jsxRuntime: "automatic",
        remarkPlugins: [require("remark-frontmatter")],
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
