import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mentors = [
  {
    name: "Dr. Alan Turing",
    role: "AI Pioneer",
    imageUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop",
    bio: "Founding father of artificial intelligence and computer science.",
    expertise: "Theoretical Computer Science",
    order: 0,
  },
  {
    name: "Ada Lovelace",
    role: "First Programmer",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2592&auto=format&fit=crop",
    bio: "Visionary mathematician who recognized the potential of computers.",
    expertise: "Mathematics & Logic",
    order: 1,
  },
  {
    name: "Grace Hopper",
    role: "Computing Pioneer",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
    bio: "Inventor of the first compiler and COBOL programming language.",
    expertise: "Systems Programming",
    order: 2,
  },
  {
    name: "Geoffrey Hinton",
    role: "Deep Learning Godfather",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop",
    bio: "Pioneer in artificial neural networks and deep learning.",
    expertise: "Neural Networks",
    order: 3,
  },
];

async function main() {
  console.log("Seeding mentors...");

  for (const mentor of mentors) {
    await prisma.mentor.upsert({
      where: { id: mentor.name.toLowerCase().replace(/[\s.]/g, "-") },
      update: mentor,
      create: {
        ...mentor,
      },
    });
  }

  const count = await prisma.mentor.count();
  console.log(`Done! ${count} mentors in database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
