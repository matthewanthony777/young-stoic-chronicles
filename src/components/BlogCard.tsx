import { motion } from "framer-motion";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  onClick: () => void;
}

export const BlogCard = ({ title, excerpt, date, readTime, image, onClick }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>{date}</span>
          <span>·</span>
          <span>{readTime}</span>
        </div>
        <h3 className="font-serif text-xl font-medium group-hover:text-sage-600 transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground line-clamp-2">
          {excerpt}
        </p>
      </div>
    </motion.div>
  );
};