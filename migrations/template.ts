import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting migration...');

  // Add your migration code here
  // Example: Adding a new field
  // await prisma.$executeRaw`ALTER TABLE "Idea" ADD COLUMN "newField" TEXT;`;

  // Example: Updating existing data
  // await prisma.idea.updateMany({
  //   where: { status: 'active' },
  //   data: { status: 'pending' }
  // });

  console.log('Migration completed!');
}

main()
  .catch((e) => {
    console.error('Error during migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
