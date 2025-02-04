import { useQuery } from "@tanstack/react-query";

interface Article {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  readTime: string;
  image: string;
  content: string;
}

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async (): Promise<Article[]> => {
      // In a real implementation, this would fetch from your GitHub repository
      // For now, we'll return a static article
      return [{
        title: "Introduction to Stoicism",
        date: "2024-03-14",
        excerpt: "A beginner's guide to understanding Stoic philosophy and its relevance in modern life.",
        author: "The Young Stoic",
        readTime: "5 min read",
        image: "/placeholder.svg",
        content: "# Introduction to Stoicism\n\nStoicism is a practical philosophy..."
      }];
    }
  });
};