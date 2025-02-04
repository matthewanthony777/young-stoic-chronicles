
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
    
    // Parse frontmatter and content
    const { data, content } = matter(text);
    
    // Compile MDX content
    const compiledContent = String(await compile(content, {
      jsx: true,
      jsxImportSource: "react",
      remarkPlugins: [remarkFrontmatter]
    }));

    // Return article with frontmatter data and compiled content
    return {
      title: data.title || "",
      date: data.date || "",
      excerpt: data.excerpt || "",
      author: data.author || "",
      readTime: data.readTime || "",
      image: data.image || "",
      content: compiledContent
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
      const article = await fetchMDXFile('introduction-to-stoicism.mdx');
      return [article];
    }
  });
};
