"use client";

import { useHabitStore } from "@/store/habit-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Flame, Target, Trophy } from "lucide-react";

export default function AnalyticsPage() {
    const { habits } = useHabitStore();

    // Metrics Logic
    const totalHabits = habits.length;
    const bestStreak = habits.reduce((max, h) => {
        // Basic streak calc for demo (real logic would need robust getStreak)
        return Math.max(max, h.completedDates.length);
    }, 0);

    // Chart Data Mockup (Real data would aggregate store)
    const data = [
        { name: 'Mon', completion: 40 },
        { name: 'Tue', completion: 30 },
        { name: 'Wed', completion: 20 },
        { name: 'Thu', completion: 27 },
        { name: 'Fri', completion: 18 },
        { name: 'Sat', completion: 23 },
        { name: 'Sun', completion: 34 },
    ];

    return (
        <div className="flex flex-col gap-8 p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Neural Analytics</h1>
                <p className="text-zinc-400">Visualize your rewriting of neural pathways.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-200">Total Protocols</CardTitle>
                        <Target className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{totalHabits}</div>
                        <p className="text-xs text-zinc-500">Active neural circuits</p>
                    </CardContent>
                </Card>

                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-200">Highest Streak</CardTitle>
                        <Flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{bestStreak}</div>
                        <p className="text-xs text-zinc-500">Days of consistency</p>
                    </CardContent>
                </Card>

                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-200">Completion Rate</CardTitle>
                        <Trophy className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">--%</div>
                        <p className="text-xs text-zinc-500">Global adherence</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="col-span-4 border-zinc-800 bg-zinc-900/50 backdrop-blur">
                <CardHeader>
                    <CardTitle className="text-zinc-200">Consistency Trend</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    stroke="#52525b"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#52525b"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a' }}
                                    itemStyle={{ color: '#d4d4d8' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="completion"
                                    stroke="#f59e0b"
                                    fillOpacity={1}
                                    fill="url(#colorPv)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
