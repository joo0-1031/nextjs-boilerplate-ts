import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  MessageSquareText,
  Sparkles,
  Users,
} from "lucide-react"

import { auth } from "@/lib/auth"
import { getPosts, getPostStats } from "@/lib/queries/posts"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export default async function BoardPage() {
  const [session, posts, stats] = await Promise.all([
    auth(),
    getPosts(),
    getPostStats(),
  ])

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#eef7f1_45%,#f7f4ea_100%)] px-5 py-6 text-slate-950 sm:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 border-b border-slate-900/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-slate-950 text-emerald-200">
              <Sparkles className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">
                Boilerplate Studio
              </p>
              <p className="mt-1 text-xs text-slate-600">Community board</p>
            </div>
          </div>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" />
              Home
            </Button>
          </Link>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <div className="rounded-xl border border-slate-900/10 bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-medium uppercase text-emerald-800">
                Board
              </p>
              <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                    Posts from the workspace
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    Browse database-backed posts and the users connected through
                    Auth.js.
                  </p>
                </div>
                {!session ? (
                  <Link href="/login">
                    <Button className="gap-2">
                      Sign in
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                ) : null}
              </div>
            </div>

            {posts.length > 0 ? (
              <div className="grid gap-3">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/board/${post.id}`}
                    className="group rounded-xl border border-slate-900/10 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-900/25 hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold group-hover:text-emerald-900">
                          {post.title}
                        </h2>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                          {post.body}
                        </p>
                      </div>
                      <ArrowRight className="size-5 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-800" />
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>
                        {post.author.name ?? post.author.email ?? "Unknown user"}
                      </span>
                      <span className="text-slate-300">/</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-900/20 bg-white/60 p-8 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-900">
                  <MessageSquareText className="size-6" />
                </div>
                <h2 className="mt-5 text-2xl font-semibold">No posts yet</h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                  The board is wired to Prisma. Add rows to the `Post` table or
                  build a create form next.
                </p>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-xl border border-slate-900/10 bg-slate-950 p-5 text-slate-50 shadow-2xl shadow-slate-900/15">
            <p className="text-xs font-medium uppercase text-emerald-300">
              Snapshot
            </p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-lg bg-white/8 p-4">
                <FileText className="mb-3 size-5 text-emerald-300" />
                <p className="text-3xl font-semibold">{stats.postCount}</p>
                <p className="mt-1 text-xs text-slate-400">Published posts</p>
              </div>
              <div className="rounded-lg bg-white/8 p-4">
                <Users className="mb-3 size-5 text-emerald-300" />
                <p className="text-3xl font-semibold">{stats.userCount}</p>
                <p className="mt-1 text-xs text-slate-400">Signed-in users</p>
              </div>
            </div>
          </aside>
        </section>
      </section>
    </main>
  )
}
