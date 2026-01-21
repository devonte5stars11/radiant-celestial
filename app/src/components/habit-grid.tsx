"use client";

import { useHabitStore } from "@/store/habit-store";
import { motion } from "framer-motion";
import { Check, Flame, Trash2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function HabitGrid() {
    const { habits, toggleHabit, removeHabit, getStreak } = useHabitStore();
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {habits.map((habit) => {
                const { current, isAtRisk } = getStreak(habit.id);
                const isCompletedToday = habit.completedDates.includes(today);

                return (
                    <motion.div
                        key={habit.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={cn(
                            "group relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:bg-zinc-900",
                            isAtRisk && "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] animate-pulse"
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-zinc-100">{habit.name}</h3>
                                <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                                    <Flame className={cn("h-3.5 w-3.5", current > 0 ? "text-orange-500 fill-orange-500" : "text-zinc-700")} />
                                    <span className={cn(current > 0 && "text-orange-500 font-medium")}>
                                        {current} day streak
                                    </span>
                                    {isAtRisk && (
                                        <span className="flex items-center gap-1 text-red-400 font-semibold">
                                            <AlertTriangle className="h-3 w-3" />
                                            DANGER
                                        </span>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeHabit(habit.id)}
                                className="h-8 w-8 text-zinc-600 opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Action Area */}
                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex gap-1">
                                {/* Mini Grid Visualization (Last 5 days) */}
                                {[...Array(5)].map((_, i) => {
                                    const date = new Date();
                                    date.setDate(date.getDate() - (4 - i));
                                    const dateStr = date.toISOString().split("T")[0];
                                    const isDone = habit.completedDates.includes(dateStr);

                                    return (
                                        <div
                                            key={i}
                                            className={cn(
                                                "h-2 w-2 rounded-full transition-colors",
                                                isDone ? "bg-amber-500" : "bg-zinc-800"
                                            )}
                                        />
                                    );
                                })}
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleHabit(habit.id, today)}
                                className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-full border transition-all",
                                    isCompletedToday
                                        ? "border-amber-500 bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                                        : "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-500"
                                )}
                            >
                                <Check className={cn("h-5 w-5", isCompletedToday ? "opacity-100" : "opacity-0")} />
                            </motion.button>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
