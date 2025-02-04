import { BlogCard } from "@/components/BlogCard";
import { useArticles } from "@/utils/articleUtils";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const Articles = () => {
  const { data: articles, isLoading, error } = useArticles();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-serif text-red-600">
            Error loading articles
          </h2>
          <p className="text-muted-foreground mt-2">
            Please try again later
          </p>
        </div>
      </div>
    );
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
          {isLoading ? (
            Array(3).fill(null).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))
          ) : (
            articles?.map((article, index) => (
              <BlogCard
                key={index}
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                readTime={article.readTime}
                image={article.image}
                onClick={() => console.log("Article clicked:", article.title)}
              />
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Articles;