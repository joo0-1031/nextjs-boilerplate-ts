import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, Sparkles, UserRound } from "lucide-react"

import { getPostById } from "@/lib/queries/posts"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params
  const post = await getPostById(postId)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#eef7f1_45%,#f7f4ea_100%)] px-5 py-6 text-slate-950 sm:px-8">
      <article className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex flex-col gap-4 border-b border-slate-900/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-slate-950 text-emerald-200">
              <Sparkles className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">
                Boilerplate Studio
              </p>
              <p className="mt-1 text-xs text-slate-600">Post detail</p>
            </div>
          </div>
          <Link href="/board">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" />
              Board
            </Button>
          </Link>
        </header>

        <section className="rounded-xl border border-slate-900/10 bg-white/85 p-5 shadow-xl shadow-slate-900/10 backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <UserRound className="size-3.5" />
              {post.author.name ?? post.author.email ?? "Unknown user"}
            </span>
            <span className="text-slate-300">/</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              {formatDate(post.createdAt)}
            </span>
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-8 whitespace-pre-wrap text-base leading-8 text-slate-700">
            {post.body}
          </div>
        </section>
      </article>
    </main>
  )
}
