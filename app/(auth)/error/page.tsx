// app/(auth)/error/page.tsx
import { AlertTriangle, ArrowLeft, RotateCcw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#fff7ed_48%,#eef7f1_100%)] px-5 py-6 text-slate-950 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl flex-col">
        <header className="flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950"
          >
            <ArrowLeft className="size-4" />
            Home
          </a>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-slate-950 text-emerald-200">
              <Sparkles className="size-4" />
            </div>
            <span className="text-sm font-semibold">Boilerplate Studio</span>
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md rounded-xl border border-slate-900/10 bg-white/85 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur">
            <div className="flex size-11 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
              <AlertTriangle className="size-5" />
            </div>
            <h1 className="mt-6 text-3xl font-semibold">
              Authentication error
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {error ??
                "The sign-in attempt could not be completed. Check the auth environment variables and callback URL."}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="/login" className="w-full sm:w-auto">
                <Button className="h-10 w-full gap-2">
                  <RotateCcw className="size-4" />
                  Try again
                </Button>
              </a>
              <a href="/" className="w-full sm:w-auto">
                <Button variant="outline" className="h-10 w-full">
                  Go home
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
