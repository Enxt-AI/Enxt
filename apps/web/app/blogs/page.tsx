"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, User } from "lucide-react";
import { useEffect, useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  order: number;
}

const POSTS_PER_PAGE = 3;

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogPosts(data);
      })
      .catch((err) => console.error("Failed to load blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  // Derive categories from dynamic data
  const categories = [
    "All",
    ...Array.from(new Set(blogPosts.map((p) => p.category))),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="pt-32 pb-20">
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, tutorials, and updates from our team about AI, machine
              learning, and business innovation.
            </p>
          </motion.div>

          {/* Categories Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={
                  category === "All" ? "bg-primary hover:bg-primary/90" : ""
                }
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {blogPosts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>No blog posts available at this time.</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-16"
              >
                <Card className="overflow-hidden border-primary/20 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto overflow-hidden">
                      <img
                        src={blogPosts[0].imageUrl}
                        alt={blogPosts[0].title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary">
                        Featured
                      </Badge>
                    </div>
                    <CardHeader className="flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">
                          {blogPosts[0].category}
                        </Badge>
                      </div>
                      <CardTitle className="text-3xl mb-4">
                        {blogPosts[0].title}
                      </CardTitle>
                      <CardDescription className="text-base mb-6">
                        {blogPosts[0].excerpt}
                      </CardDescription>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {blogPosts[0].author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {blogPosts[0].date}
                        </div>
                      </div>
                      <Link href={`/blogs/${blogPosts[0].id}`}>
                        <Button className="bg-primary hover:bg-primary/90 w-fit gap-2">
                          Read More <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardHeader>
                  </div>
                </Card>
              </motion.div>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.slice(1, 1 + visibleCount).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader className="flex-1">
                        <Badge variant="secondary" className="w-fit mb-3">
                          {post.category}
                        </Badge>
                        <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </div>
                        </div>
                        <Link href={`/blogs/${post.id}`}>
                          <Button
                            variant="ghost"
                            className="w-full gap-2 group-hover:bg-primary/10"
                          >
                            Read More <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {visibleCount < blogPosts.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-center mt-12"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() =>
                      setVisibleCount((prev) => prev + POSTS_PER_PAGE)
                    }
                  >
                    Load More Posts
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blogs;
