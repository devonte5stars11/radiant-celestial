import { Button } from "@/components/ui/button";

/**
 * Hero Section for Habit Forge Dashboard
 * "Forge Unbreakable Habits in 2026"
 * 
 * @description Premium, obsidian-dark hero section with CTA
 * @sovereignty Devonte Brown - Platinum Trinity Protocol
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      {/* Hero Section */}
      <main className="flex w-full max-w-4xl flex-col items-center gap-8 px-6 py-24 text-center">
        {/* Badge */}
        <div className="rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm text-zinc-400">
          🔥 Join 10,000+ Sovereign Commanders
        </div>

        {/* Headline */}
        <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          Forge{" "}
          <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Unbreakable
          </span>{" "}
          Habits in 2026
        </h1>

        {/* Subheadline */}
        <p className="max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
          The clinical habit tracker for high-performers. Build streaks, crush goals,
          and achieve sovereignty over your daily actions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            className="h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 text-base font-semibold text-black hover:from-amber-400 hover:to-orange-500"
          >
            Start Forging — Free
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 rounded-full border-zinc-700 px-8 text-base font-semibold hover:bg-zinc-900"
          >
            Watch Demo
          </Button>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 flex items-center gap-2 text-sm text-zinc-500">
          <span className="flex items-center gap-1">
            ⭐⭐⭐⭐⭐ <span className="text-zinc-300">4.9/5</span>
          </span>
          <span className="text-zinc-700">•</span>
          <span>No credit card required</span>
          <span className="text-zinc-700">•</span>
          <span>Cancel anytime</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="pb-8 text-center text-xs text-zinc-600">
        Sovereignty Secured for Devonte Brown
      </footer>
    </div>
  );
}
