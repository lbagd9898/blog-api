const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function main() {
  const posts = [
    {
      title: "Lydia's first blog",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      userId: 1,
    },
    {
      title: "Adventures in Costa Rica",
      content:
        "From the cloud forests of Monteverde to the beaches of Guanacaste, Costa Rica offers a vibrant mix of wildlife and culture. Traveling through small towns, I found that the best meals came from family kitchens rather than fancy restaurants.",
      userId: 3,
    },
    {
      title: "Why I Started Learning JavaScript",
      content:
        "After years of curiosity, I finally decided to dive into programming. JavaScript felt like the perfect place to start—it powers so much of what we see online. The learning curve has been steep, but the satisfaction of making something work is worth it.",
      userId: 5,
    },
  ];

  const comments = [
    { content: "the cloud forest is such a cool place", userId: 4, postId: 2 },
    {
      content:
        "Learning JavaScript changed the way I think about problem-solving.",
      userId: 3,
      postId: 3,
    },
    {
      content: "Great first post! Looking forward to reading more from you.",
      userId: 5,
      postId: 1,
    },
    {
      content: "I totally agree—local food in Costa Rica is unbeatable.",
      userId: 2,
      postId: 2,
    },
  ];

  await prisma.posts.createMany({
    data: posts,
  });

  await prisma.comments.createMany({
    data: comments,
  });

  console.log("entries added successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
