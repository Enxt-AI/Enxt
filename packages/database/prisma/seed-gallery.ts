import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const galleryItems = [
  {
    title: "AI Dashboard Interface",
    category: "UI/UX Design",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    order: 0,
  },
  {
    title: "Machine Learning Pipeline",
    category: "Development",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
    order: 1,
  },
  {
    title: "Data Visualization",
    category: "Analytics",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    order: 2,
  },
  {
    title: "AI-Powered Chatbot",
    category: "AI Solutions",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    order: 3,
  },
  {
    title: "Cloud Infrastructure",
    category: "DevOps",
    imageUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
    order: 4,
  },
  {
    title: "Automated Workflows",
    category: "Automation",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    order: 5,
  },
];

async function main() {
  console.log("Seeding gallery items...");

  for (const item of galleryItems) {
    await prisma.galleryItem.create({
      data: item,
    });
  }

  const count = await prisma.galleryItem.count();
  console.log(`Done! ${count} gallery items in database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
