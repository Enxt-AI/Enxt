import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const blogPosts = [
  {
    title: "The Future of AI in Business Automation",
    excerpt:
      "Discover how artificial intelligence is revolutionizing business processes and creating new opportunities for growth and efficiency.",
    author: "John Doe",
    date: "January 10, 2026",
    readTime: "5 min read",
    category: "AI & Automation",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    order: 0,
  },
  {
    title: "Building Scalable Machine Learning Pipelines",
    excerpt:
      "Learn the best practices for creating robust and scalable ML pipelines that can handle production workloads efficiently.",
    author: "Jane Smith",
    date: "January 8, 2026",
    readTime: "8 min read",
    category: "Machine Learning",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop",
    order: 1,
  },
  {
    title: "Data Privacy in the Age of AI",
    excerpt:
      "Understanding the importance of data privacy and security when implementing AI solutions in your organization.",
    author: "Mike Johnson",
    date: "January 5, 2026",
    readTime: "6 min read",
    category: "Security",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    order: 2,
  },
  {
    title: "Natural Language Processing: A Complete Guide",
    excerpt:
      "Explore the world of NLP and how it's transforming how businesses interact with customers through chatbots and virtual assistants.",
    author: "Sarah Williams",
    date: "January 3, 2026",
    readTime: "10 min read",
    category: "NLP",
    imageUrl:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=500&fit=crop",
    order: 3,
  },
  {
    title: "Cloud Infrastructure for AI Applications",
    excerpt:
      "A comprehensive guide to choosing and implementing the right cloud infrastructure for your AI projects.",
    author: "David Brown",
    date: "December 30, 2025",
    readTime: "7 min read",
    category: "Cloud Computing",
    imageUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop",
    order: 4,
  },
  {
    title: "The ROI of AI Investment: What to Expect",
    excerpt:
      "Understanding the return on investment when implementing AI solutions and how to measure success effectively.",
    author: "Emily Davis",
    date: "December 28, 2025",
    readTime: "5 min read",
    category: "Business",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    order: 5,
  },
];

async function main() {
  console.log("Seeding blog posts...");

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: post,
    });
  }

  const count = await prisma.blogPost.count();
  console.log(`Done! ${count} blog posts in database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
