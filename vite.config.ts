
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import mdx from "@mdx-js/rollup";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    {
      ...mdx({
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
    include: ['@mdx-js/react', 'react/jsx-runtime']
  }
}));
