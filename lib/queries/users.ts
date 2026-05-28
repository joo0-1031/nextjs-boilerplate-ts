import { db } from "@/lib/db"

export async function getUsers({ take = 12 }: { take?: number } = {}) {
  return db.user.findMany({
    take,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      _count: {
        select: {
          posts: true,
        },
      },
    },
  })
}

export async function getUserById(id: string) {
  return db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      _count: {
        select: {
          posts: true,
        },
      },
    },
  })
}
