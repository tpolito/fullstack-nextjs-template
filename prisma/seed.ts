import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

console.log('Creating users + climbs');

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createClimbData = (): Array<{ attempts: number; grade: string }> => {
  const climbs: Array<{ attempts: number; grade: string }> = [];

  for (let i = 0; i < randomIntFromInterval(10, 20); i += 1) {
    climbs.push({
      attempts: randomIntFromInterval(1, 15),
      grade: `v${randomIntFromInterval(0, 9)}`,
    });
  }

  return climbs;
};

async function main() {
  for (let i = 0; i < 100; i += 1) {
    await db.user.upsert({
      where: { email: `test_user_${i}@testemail.com` },
      update: {},
      create: {
        name: `test_user_${i}`,
        email: `test_user_${i}@testemail.com`,
        climbs: {
          create: createClimbData(),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect;
  });
