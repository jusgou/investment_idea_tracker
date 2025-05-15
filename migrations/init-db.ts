import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database initialization...');

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@swingfaders.com',
      name: 'Admin User',
      isAdmin: true
    }
  });

  // Create initial categories
  await prisma.idea.createMany({
    data: [
      {
        title: 'Example Investment Idea',
        category: 'stock',
        symbol: 'AAPL',
        targetBuyPrice: 180.0,
        currentPrice: 185.0,
        description: 'Example investment idea for testing purposes',
        tags: ['technology', 'growth'],
        status: 'active',
        userId: adminUser.id
      },
    ],
  });

  console.log('Database initialization completed!');
}

main()
  .catch((e) => {
    console.error('Error during database initialization:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
