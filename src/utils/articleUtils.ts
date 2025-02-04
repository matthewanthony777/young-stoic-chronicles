
import { useQuery } from "@tanstack/react-query";
import { compile } from "@mdx-js/mdx";
import remarkFrontmatter from 'remark-frontmatter';
import matter from 'gray-matter';
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
    
    // Parse frontmatter
    const { data, content } = matter(text);
    
    // Compile MDX content
    const compiledContent = await compile(content, {
      jsx: true,
      jsxRuntime: "automatic",
      jsxImportSource: "react",
      remarkPlugins: [remarkFrontmatter]
    });

    return {
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      author: data.author,
      readTime: data.readTime,
      image: data.image,
      content: String(compiledContent)
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
