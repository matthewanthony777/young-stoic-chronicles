
import { useQuery } from "@tanstack/react-query";
import { compile } from "@mdx-js/mdx";
import remarkFrontmatter from 'remark-frontmatter';
import * as runtime from "react/jsx-runtime";

interface Article {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  readTime: string;
  image: string;
  content: string;
}

async function fetchMDXFile(filename: string) {
  try {
    const response = await fetch(`/content/articles/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}`);
    }
    const text = await response.text();
    
    // Extract frontmatter using regex
    const frontmatterRegex = /---\n([\s\S]*?)\n---/;
    const match = text.match(frontmatterRegex);
    const frontmatter = match ? match[1] : '';
    
    // Parse frontmatter
    const metadata: Partial<Article> = {};
    frontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        const value = valueParts.join(':').trim().replace(/^"(.*)"$/, '$1');
        metadata[key.trim() as keyof Article] = value;
      }
    });

    // Remove frontmatter from content
    const contentWithoutFrontmatter = text.replace(frontmatterRegex, '').trim();

    // Compile MDX content with remark-frontmatter plugin
    const result = await compile(contentWithoutFrontmatter, {
      outputFormat: 'function-body',
      pragma: 'React.createElement',
      pragmaFrag: 'React.Fragment',
      remarkPlugins: [remarkFrontmatter]
    });

    return {
      ...metadata,
      content: String(result.value)
    } as Article;
  } catch (error) {
    console.error('Error fetching MDX file:', error);
    throw error;
  }
}

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async (): Promise<Article[]> => {
      // For now, we'll fetch the single article we know exists
      const article = await fetchMDXFile('introduction-to-stoicism.mdx');
      return [article];
    }
  });
};
