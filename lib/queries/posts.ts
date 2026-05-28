import { db } from "@/lib/db"

export async function getPosts({ take = 20 }: { take?: number } = {}) {
  return db.post.findMany({
    take,
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  })
}

export async function getPostById(id: string) {
  return db.post.findFirst({
    where: {
      id,
      published: true,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  })
}

export async function getPostStats() {
  const [postCount, userCount] = await Promise.all([
    db.post.count({ where: { published: true } }),
    db.user.count(),
  ])

  return {
    postCount,
    userCount,
  }
}
