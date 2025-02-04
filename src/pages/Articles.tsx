import { BlogCard } from "@/components/BlogCard";
import { useArticles } from "@/utils/articleUtils";
import { motion } from "framer-motion";

const Articles = () => {
  const { data: articles, isLoading, error } = useArticles();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-20">Error loading articles</div>;
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="font-serif text-4xl font-medium mb-12">Articles</h1>
        <div className="grid gap-12">
          {articles?.map((article, index) => (
            <BlogCard
              key={index}
              title={article.title}
              excerpt={article.excerpt}
              date={article.date}
              readTime={article.readTime}
              image={article.image}
              onClick={() => console.log("Article clicked:", article.title)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Articles;