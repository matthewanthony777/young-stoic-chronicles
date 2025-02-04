import { BlogCard } from "@/components/BlogCard";
import { motion } from "framer-motion";

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Modern Stoic's Guide to Daily Practice",
    excerpt: "Discover practical ways to incorporate Stoic principles into your daily routine for a more balanced and purposeful life.",
    date: "Mar 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    id: 2,
    title: "Finding Tranquility in Chaos",
    excerpt: "Learn how Stoic philosophy can help you maintain inner peace during challenging times and uncertain circumstances.",
    date: "Mar 12, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
  {
    id: 3,
    title: "The Art of Stoic Reflection",
    excerpt: "Explore the power of journaling and self-reflection through the lens of Stoic philosophy.",
    date: "Mar 10, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h1 className="font-serif text-4xl mb-4">Latest Articles</h1>
          <p className="text-muted-foreground">
            Explore our collection of articles on Stoic philosophy and its practical applications in modern life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <BlogCard
              key={post.id}
              {...post}
              onClick={() => console.log(`Clicked post ${post.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;