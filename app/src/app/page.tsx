"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Flame } from "lucide-react";

/**
 * Hero Section for Habit Forge Dashboard (Ultimate Edition)
 * "Forge Unbreakable Habits in 2026"
 * 
 * @description Motion-enhanced, obsidian-dark hero section.
 * @sovereignty Devonte Brown - Platinum Trinity Protocol
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white selection:bg-amber-500/30">

      <main className="flex w-full max-w-5xl flex-col items-center gap-10 px-6 py-24 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-sm"
        >
          <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
          <span>Join 10,000+ Sovereign Commanders</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl"
        >
          Forge{" "}
          <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Unbreakable
          </span>{" "}
          <br className="hidden md:block" />
          Habits in 2026
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl"
        >
          The clinical habit tracker for high-performers. Build streaks, crush goals,
          and achieve sovereignty over your daily actions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="group h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 text-base font-bold text-black transition-all hover:scale-105 hover:from-amber-400 hover:to-orange-500 hover:shadow-[0_0_20px_rgba(251,146,60,0.3)]"
          >
            Start Forging — Free
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group h-14 rounded-full border-zinc-700 bg-transparent px-8 text-base font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:bg-zinc-900 hover:text-white"
          >
            <Play className="mr-2 h-4 w-4 fill-current opacity-70" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500"
        >
          <span className="flex items-center gap-1.5">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <span className="text-zinc-300 font-medium">4.9/5</span> from Power Users
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-zinc-600" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-zinc-600" />
            Cancel anytime
          </span>
        </motion.div>
      </main>

      {/* Footer / Status */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 text-center text-xs font-mono text-zinc-800"
      >
        SOVEREIGNTY SECURED
      </motion.footer>
    </div>
  );
}
