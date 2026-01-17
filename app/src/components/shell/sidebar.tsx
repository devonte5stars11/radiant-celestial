"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    BarChart3,
    Settings,
    Menu,
    X,
    Zap,
    LogOut,
    User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommandPalette } from "./command-palette";

const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Header */}
            <div className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-zinc-800 bg-black/50 px-6 backdrop-blur-xl md:hidden">
                <div className="flex items-center gap-2 font-bold text-white">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-600">
                        <Zap className="h-5 w-5 fill-black text-black" />
                    </div>
                    <span>Habit Forge</span>
                </div>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] border-l-zinc-800 bg-black p-0">
                        <MobileSidebar />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <motion.aside
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="hidden h-screen w-72 flex-col border-r border-zinc-800 bg-black md:flex"
            >
                {/* Brand */}
                <div className="flex h-16 items-center border-b border-zinc-800 px-6">
                    <Link href="/" className="flex items-center gap-3 decoration-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 shadow-[0_0_15px_rgba(251,146,60,0.4)]">
                            <Zap className="h-5 w-5 fill-black text-black" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-white">
                            Habit Forge
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="px-2">
                        <CommandPalette />
                    </div>

                    <nav className="space-y-1 px-2">
                        {sidebarLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                                        isActive
                                            ? "bg-zinc-800/80 text-white"
                                            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                                    )}
                                >
                                    <link.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-amber-500" : "text-zinc-500 group-hover:text-zinc-300")} />
                                    {link.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-500"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* User Footer */}
                <div className="border-t border-zinc-800 p-4">
                    <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
                        <Avatar className="h-9 w-9 border border-zinc-700">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback className="bg-zinc-800 text-xs text-zinc-400">DB</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-medium text-white">Devonte Brown</p>
                            <p className="truncate text-xs text-zinc-500">Sovereign Pro</p>
                        </div>
                    </div>
                </div>
            </motion.aside>
        </>
    );
}

function MobileSidebar() {
    const pathname = usePathname();
    return (
        <div className="flex h-full flex-col bg-black">
            <div className="flex h-16 items-center px-6 border-b border-zinc-800">
                <span className="font-bold text-white">Menu</span>
            </div>
            <div className="flex-1 p-4 space-y-4">
                {sidebarLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all",
                            pathname === link.href
                                ? "bg-zinc-800 text-white"
                                : "text-zinc-400 hover:bg-zinc-900"
                        )}
                    >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}
