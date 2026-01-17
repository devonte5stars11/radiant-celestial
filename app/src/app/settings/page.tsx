"use client";

import { useState } from "react";
import { useHabitStore } from "@/store/habit-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Download, Upload, Trash2, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner or useToast is available, if not falling back to alert

export default function SettingsPage() {
    const { habits, importData, nukeData } = useHabitStore();
    const [importFile, setImportFile] = useState<File | null>(null);

    const handleExport = () => {
        const dataStr = JSON.stringify(habits, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `habit_forge_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImport = async () => {
        if (!importFile) return;

        try {
            const text = await importFile.text();
            const data = JSON.parse(text);
            if (Array.isArray(data)) {
                importData(data);
                alert("Protocol data imported successfully.");
            } else {
                alert("Invalid format: Backup must be an array of habits.");
            }
        } catch (e) {
            alert("Failed to parse backup file.");
        }
    };

    const handleNuke = () => {
        if (confirm("ARE YOU SURE? This will wipe all your neural data permanently.")) {
            nukeData();
        }
    };

    return (
        <div className="flex flex-col gap-8 p-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Settings & Sovereignty</h1>
                <p className="text-zinc-400">Manage your identity and retain full control of your data.</p>
            </div>

            {/* Identity Section */}
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-zinc-800 rounded-lg">
                            <User className="h-5 w-5 text-zinc-400" />
                        </div>
                        <div>
                            <CardTitle className="text-zinc-200">Identity</CardTitle>
                            <CardDescription>How you appear in the sanctuary.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="display-name" className="text-zinc-300">Display Name</Label>
                        <Input id="display-name" defaultValue="Devonte Brown" className="bg-zinc-950 border-zinc-800 text-white" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-zinc-300">Title</Label>
                        <Input id="title" defaultValue="Sovereign Pro" className="bg-zinc-950 border-zinc-800 text-white" />
                    </div>
                    <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
                        Save Changes
                    </Button>
                </CardContent>
            </Card>

            {/* Data Sovereignty Section */}
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 rounded-lg">
                            <ShieldCheck className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                            <CardTitle className="text-zinc-200">Data Sovereignty</CardTitle>
                            <CardDescription>You own your data. Export it anytime or restore from a backup.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg bg-zinc-950/50">
                        <div className="space-y-1">
                            <h3 className="font-medium text-zinc-200">Export Backup</h3>
                            <p className="text-sm text-zinc-500">Download a JSON file of your entire habit history.</p>
                        </div>
                        <Button onClick={handleExport} variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
                            <Download className="mr-2 h-4 w-4" />
                            Export JSON
                        </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg bg-zinc-950/50">
                        <div className="space-y-1">
                            <h3 className="font-medium text-zinc-200">Import Backup</h3>
                            <p className="text-sm text-zinc-500">Restore your history from a previous export.</p>
                        </div>
                        <div className="flex gap-2">
                            <Input
                                type="file"
                                accept=".json"
                                onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                                className="w-[200px] bg-zinc-950 border-zinc-800 text-zinc-400 file:text-zinc-400"
                            />
                            <Button onClick={handleImport} disabled={!importFile} className="bg-zinc-800 hover:bg-zinc-700 text-white">
                                <Upload className="mr-2 h-4 w-4" />
                                Import
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-900/30 bg-red-950/10 backdrop-blur">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-900/20 rounded-lg">
                            <Trash2 className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                            <CardTitle className="text-red-500">Danger Zone</CardTitle>
                            <CardDescription className="text-red-900/60">Irreversible actions.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-red-400">Nuke All Data</h3>
                            <p className="text-sm text-red-900/60">Permanently delete all habits and history.</p>
                        </div>
                        <Button onClick={handleNuke} variant="destructive" className="bg-red-900 hover:bg-red-800 text-white border-red-800">
                            Nuke It
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
