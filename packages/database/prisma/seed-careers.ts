import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const jobOpenings = [
  {
    title: "Senior AI Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Join our AI team to build cutting-edge machine learning solutions that transform businesses.",
    requirements: JSON.stringify([
      "5+ years in ML/AI",
      "Python, TensorFlow",
      "Computer Vision experience",
    ]),
    order: 0,
  },
  {
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Hybrid",
    type: "Full-time",
    description:
      "Build scalable web applications using modern frameworks and cloud technologies.",
    requirements: JSON.stringify([
      "3+ years full-stack",
      "React, Node.js",
      "AWS/Azure experience",
    ]),
    order: 1,
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    description:
      "Lead product strategy and development for our AI-powered solutions.",
    requirements: JSON.stringify([
      "3+ years PM experience",
      "AI/ML product knowledge",
      "Agile methodology",
    ]),
    order: 2,
  },
  {
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Create beautiful and intuitive interfaces for our AI products.",
    requirements: JSON.stringify([
      "3+ years design experience",
      "Figma proficiency",
      "Design systems",
    ]),
    order: 3,
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Hybrid",
    type: "Full-time",
    description:
      "Build and maintain our cloud infrastructure and deployment pipelines.",
    requirements: JSON.stringify([
      "3+ years DevOps",
      "Kubernetes, Docker",
      "CI/CD expertise",
    ]),
    order: 4,
  },
  {
    title: "Data Scientist",
    department: "Data",
    location: "Remote",
    type: "Full-time",
    description:
      "Analyze complex datasets and develop predictive models to drive business insights.",
    requirements: JSON.stringify([
      "4+ years data science",
      "Python, R",
      "Statistical modeling",
    ]),
    order: 5,
  },
];

async function main() {
  console.log("Seeding career openings...");

  for (const job of jobOpenings) {
    await prisma.careerOpening.create({
      data: job,
    });
  }

  const count = await prisma.careerOpening.count();
  console.log(`Done! ${count} career openings in database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
