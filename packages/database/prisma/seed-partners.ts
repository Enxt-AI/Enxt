import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const partners = [
  { name: "Nebula AI", logoUrl: "https://picsum.photos/seed/nebula/128/128", color: "text-indigo-600 bg-indigo-100" },
  { name: "GlobalTech", logoUrl: "https://picsum.photos/seed/globaltech/128/128", color: "text-emerald-600 bg-emerald-100" },
  { name: "FastStream", logoUrl: "https://picsum.photos/seed/faststream/128/128", color: "text-amber-500 bg-amber-100" },
  { name: "ConnectX", logoUrl: "https://picsum.photos/seed/connectx/128/128", color: "text-blue-500 bg-blue-100" },
  { name: "CloudScale", logoUrl: "https://picsum.photos/seed/cloudscale/128/128", color: "text-sky-500 bg-sky-100" },
  { name: "DataFlow", logoUrl: "https://picsum.photos/seed/dataflow/128/128", color: "text-rose-500 bg-rose-100" },
  { name: "CodeCraft", logoUrl: "https://picsum.photos/seed/codecraft/128/128", color: "text-violet-600 bg-violet-100" },
  { name: "EnterpriseOne", logoUrl: "https://picsum.photos/seed/enterprise/128/128", color: "text-slate-700 bg-slate-200" },
];

async function main() {
  console.log("🗑️ Deleting existing partners...");
  await prisma.partner.deleteMany();

  console.log("🌱 Seeding partners with random images...");
  for (let i = 0; i < partners.length; i++) {
    await prisma.partner.create({
      data: {
        ...partners[i],
        order: i,
      },
    });
  }

  console.log(`✅ Seeded ${partners.length} partners.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
