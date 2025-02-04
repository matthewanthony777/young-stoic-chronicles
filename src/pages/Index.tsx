import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Newsletter } from "@/components/Newsletter";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <span className="inline-block px-3 py-1 text-sm bg-sage-100 text-sage-700 rounded-full">
            Welcome to The Young Stoic
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium leading-tight">
            Ancient Wisdom for the Modern Mind
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover how Stoic philosophy can help you navigate life's challenges and find inner peace in today's fast-paced world.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/blog")}
              className="bg-sage-600 hover:bg-sage-700"
            >
              Read Our Blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/philosophy")}
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-sage-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-3xl">Join Our Newsletter</h2>
            <p className="text-muted-foreground">
              Get weekly insights on Stoic philosophy and practical wisdom for modern life.
            </p>
            <Newsletter />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;