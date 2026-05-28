// app/(auth)/login/page.tsx
import { signIn } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#eef7f1_45%,#f7f4ea_100%)] px-5 py-6 text-slate-950 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950"
          >
            <ArrowLeft className="size-4" />
            Back
          </a>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-slate-950 text-emerald-200">
              <Sparkles className="size-4" />
            </div>
            <span className="text-sm font-semibold">Boilerplate Studio</span>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1fr_420px]">
          <div className="max-w-2xl space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white/70 px-3 py-1 text-xs font-medium text-emerald-950 shadow-sm">
              <ShieldCheck className="size-3.5" />
              Secure Google OAuth
            </div>
            <h1 className="text-5xl font-semibold leading-[1.03] tracking-normal sm:text-6xl">
              Sign in to your build-ready workspace.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Continue into a Next.js application shell with Auth.js sessions,
              Prisma models, and a Neon-backed data layer.
            </p>
            <div className="grid max-w-lg gap-3 sm:grid-cols-2">
              {["Database sessions", "Vercel ready"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-slate-900/10 bg-white/70 p-3 text-sm font-medium shadow-sm"
                >
                  <CheckCircle2 className="size-4 text-emerald-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-900/10 bg-white/85 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur">
            <div className="border-b border-slate-900/10 pb-5">
              <p className="text-xs font-medium uppercase text-slate-500">
                Account
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Welcome in</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use the Google account connected to this project.
              </p>
            </div>
            <form
              className="pt-5"
              action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/" })
              }}
            >
              <Button type="submit" className="h-11 w-full gap-2">
                <span className="flex size-5 items-center justify-center rounded bg-white text-xs font-bold text-slate-950">
                  G
                </span>
                Continue with Google
              </Button>
            </form>
            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              Access is handled by Google and stored through Auth.js.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
