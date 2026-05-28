// app/page.tsx
import { auth, signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Database,
  Gauge,
  LogOut,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

const dashboardHighlights: {
  label: string
  value: string
  icon: LucideIcon
}[] = [
  { label: "Auth", value: "Google OAuth ready", icon: ShieldCheck },
  { label: "Data", value: "Prisma models wired", icon: Database },
  { label: "Build", value: "Vercel deploy flow", icon: Gauge },
]

const starterFeatures = [
  {
    title: "Authentication",
    description: "Google OAuth flow with Auth.js v5.",
  },
  {
    title: "Persistence",
    description: "Prisma adapter schema ready for Neon.",
  },
  {
    title: "Interface",
    description: "Tailwind v4 and shadcn-style primitives.",
  },
]

export default async function Home() {
  const session = await auth()
  const userEmail = session?.user?.email ?? "your workspace"
  const userName = session?.user?.name ?? userEmail

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(135deg,#f8fafc_0%,#eef7f1_45%,#f7f4ea_100%)] text-slate-950">
      {session ? (
        <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8">
          <header className="flex items-center justify-between border-b border-slate-900/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-950 text-emerald-50">
                <Sparkles className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">
                  Boilerplate Studio
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Authenticated workspace
                </p>
              </div>
            </div>
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}
            >
              <Button type="submit" variant="outline" className="gap-2">
                <LogOut className="size-4" />
                Sign out
              </Button>
            </form>
          </header>

          <div className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1fr_380px]">
            <section className="space-y-8">
              <div className="max-w-2xl space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white/70 px-3 py-1 text-xs font-medium text-emerald-950 shadow-sm">
                  <CheckCircle2 className="size-3.5" />
                  Google sign-in is active
                </div>
                <h1 className="text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-6xl">
                  Welcome back, {userName.split(" ")[0]}.
                </h1>
                <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                  Your Next.js starter is connected, signed in, and ready for the
                  next layer of product work.
                </p>
              </div>

              <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
                {dashboardHighlights.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-slate-900/10 bg-white/75 p-4 shadow-sm"
                  >
                    <Icon className="mb-4 size-5 text-emerald-800" />
                    <p className="text-xs font-medium uppercase text-slate-500">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-950">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <aside className="rounded-xl border border-slate-900/10 bg-slate-950 p-5 text-slate-50 shadow-2xl shadow-slate-900/15">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-medium uppercase text-emerald-300">
                    Session
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">Live account</h2>
                </div>
                <Activity className="size-5 text-emerald-300" />
              </div>
              <div className="space-y-4 py-5">
                <div>
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="mt-1 break-all text-sm font-medium">
                    {userEmail}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-white/8 p-3">
                    <p className="text-2xl font-semibold">4</p>
                    <p className="mt-1 text-xs text-slate-400">Auth tables</p>
                  </div>
                  <div className="rounded-lg bg-white/8 p-3">
                    <p className="text-2xl font-semibold">16</p>
                    <p className="mt-1 text-xs text-slate-400">Next version</p>
                  </div>
                </div>
              </div>
              <a
                href="/board"
                className="block rounded-lg bg-emerald-300 p-4 text-emerald-950 transition hover:bg-emerald-200"
              >
                <p className="text-sm font-semibold">Open the board</p>
                <p className="mt-1 text-sm leading-6">
                  Browse users and posts backed by Prisma.
                </p>
              </a>
            </aside>
          </div>
        </section>
      ) : (
        <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-slate-950 text-emerald-200">
                <Sparkles className="size-4" />
              </div>
              <span className="text-sm font-semibold">Boilerplate Studio</span>
            </div>
            <a href="/login">
              <Button variant="outline">Sign in</Button>
            </a>
          </header>

          <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="max-w-3xl space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                <ShieldCheck className="size-3.5 text-emerald-800" />
                Next.js 16, Auth.js, Prisma, Neon
              </div>
              <h1 className="text-5xl font-semibold leading-[1.03] tracking-normal text-slate-950 sm:text-7xl">
                Start with the hard parts already connected.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                A compact application shell with Google sign-in, database-backed
                sessions, and a deploy-ready Next.js foundation.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="/login">
                  <Button size="lg" className="h-11 gap-2 px-4">
                    Continue with Google
                    <ArrowRight className="size-4" />
                  </Button>
                </a>
                <a href="/board">
                  <Button variant="secondary" size="lg" className="h-11 px-4">
                    View board
                  </Button>
                </a>
                <a href="https://vercel.com" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="lg" className="h-11 px-4">
                    Deploy on Vercel
                  </Button>
                </a>
              </div>
            </section>

            <section className="grid gap-3">
              {starterFeatures.map(({ title, description }, index) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-900/10 bg-white/75 p-5 shadow-sm backdrop-blur"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-xs font-medium uppercase text-slate-500">
                      0{index + 1}
                    </span>
                    <CheckCircle2 className="size-5 text-emerald-700" />
                  </div>
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </div>
              ))}
            </section>
          </div>
        </section>
      )}
    </main>
  )
}
