"use client";

import { useState } from "react";
import { useHabitStore } from "@/store/habit-store";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CreateHabitForm() {
    const [name, setName] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const addHabit = useHabitStore((state) => state.addHabit);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        addHabit(name);
        setName("");
        setIsExpanded(false);
    };

    return (
        <div className="w-full max-w-md">
            {!isExpanded ? (
                <Button
                    onClick={() => setIsExpanded(true)}
                    variant="outline"
                    className="w-full border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Protocol
                </Button>
            ) : (
                <AnimatePresence>
                    <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleSubmit}
                        className="flex gap-2 overflow-hidden"
                    >
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. 05:00 Cold Plunge"
                            autoFocus
                            className="flex-1 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none"
                        />
                        <Button type="submit" size="sm" className="bg-amber-600 text-white hover:bg-amber-700">
                            Forge
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsExpanded(false)}
                            className="text-zinc-500 hover:text-zinc-300"
                        >
                            Cancel
                        </Button>
                    </motion.form>
                </AnimatePresence>
            )}
        </div>
    );
}
