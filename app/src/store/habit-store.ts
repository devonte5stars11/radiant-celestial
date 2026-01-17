import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Habit {
    id: string;
    name: string;
    completedDates: string[]; // ISO date strings YYYY-MM-DD
    createdAt: string;
}

interface HabitState {
    habits: Habit[];
    addHabit: (name: string) => void;
    removeHabit: (id: string) => void;
    toggleHabit: (id: string, date: string) => void;
    getStreak: (id: string) => { current: number; max: number; isAtRisk: boolean };
}

export const useHabitStore = create<HabitState>()(
    persist(
        (set, get) => ({
            habits: [],

            addHabit: (name) =>
                set((state) => ({
                    habits: [
                        ...state.habits,
                        {
                            id: crypto.randomUUID(),
                            name,
                            completedDates: [],
                            createdAt: new Date().toISOString(),
                        },
                    ],
                })),

            removeHabit: (id) =>
                set((state) => ({
                    habits: state.habits.filter((h) => h.id !== id),
                })),

            toggleHabit: (id, date) =>
                set((state) => ({
                    habits: state.habits.map((h) => {
                        if (h.id !== id) return h;
                        const exists = h.completedDates.includes(date);
                        return {
                            ...h,
                            completedDates: exists
                                ? h.completedDates.filter((d) => d !== date)
                                : [...h.completedDates, date].sort(),
                        };
                    }),
                })),

            getStreak: (id) => {
                const habit = get().habits.find((h) => h.id === id);
                if (!habit) return { current: 0, max: 0, isAtRisk: false };

                const sortedDates = [...habit.completedDates].sort();
                if (sortedDates.length === 0) return { current: 0, max: 0, isAtRisk: false };

                const today = new Date().toISOString().split('T')[0];
                const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

                // Calculate Current Streak
                let currentStreak = 0;
                let checkDate = new Date();

                // If today is done, start checking from today. If not, start from yesterday.
                if (sortedDates.includes(today)) {
                    checkDate = new Date();
                } else if (sortedDates.includes(yesterday)) {
                    checkDate = new Date(Date.now() - 86400000);
                } else {
                    // Streak broken
                    return { current: 0, max: 0, isAtRisk: false };
                }

                while (true) {
                    const dateStr = checkDate.toISOString().split('T')[0];
                    if (sortedDates.includes(dateStr)) {
                        currentStreak++;
                        checkDate.setDate(checkDate.getDate() - 1);
                    } else {
                        break;
                    }
                }

                // Loss Aversion: At risk if completed yesterday but NOT today
                const isAtRisk = sortedDates.includes(yesterday) && !sortedDates.includes(today);

                return { current: currentStreak, max: currentStreak, isAtRisk }; // TODO: Max streak logic later
            },
        }),
        {
            name: 'habit-forge-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
