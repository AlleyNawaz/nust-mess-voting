"use client";

import { useVoting } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MAIN_MENU, RAMADAN_MENU } from "@/lib/data"; // Updated Import
import { submitVotes } from "@/lib/actions";
import { useState } from "react";
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react";

export default function SummaryPage() {
    const { user, mainMenuVotes, ramadanMenuVotes } = useVoting();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!user) return null;

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);

        const result = await submitVotes({
            user,
            mainMenuVotes,
            ramadanMenuVotes
        });

        if (result.success) {
            router.push("/success");
        } else {
            setError(result.message || "Something went wrong.");
            setIsSubmitting(false);
        }
    };

    const getName = (id: string, isRamadan: boolean, meal: string, dayOfWeek?: string) => {
        if (id === 'custom') return 'Custom Suggestion';

        if (!isRamadan) {
            // Main menu search (can optimize with day if provided, but loop is fine)
            for (const day of MAIN_MENU) {
                if (dayOfWeek && day.day !== dayOfWeek) continue;

                // @ts-ignore
                const menuLogic = day.meals[meal];
                if (menuLogic) {
                    const found = menuLogic.items.find((o: any) => o.id === id);
                    if (found) return found.name;
                }
            }
        } else {
            // Ramadan menu search
            for (const day of RAMADAN_MENU) {
                if (dayOfWeek && day.day !== dayOfWeek) continue;

                // @ts-ignore
                const menuLogic = day.meals[meal];
                if (menuLogic) {
                    const found = menuLogic.items.find((o: any) => o.id === id);
                    if (found) return found.name;
                }
            }
        }
        return id;
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-12">
            <div className="text-center space-y-3">
                <h1 className="text-4xl font-bold text-white tracking-tight">Review Your Votes</h1>
                <p className="text-steel">Please review your selections clearly before submitting. This cannot be undone.</p>
            </div>

            {error && (
                <div className="bg-red-500/10 text-red-200 p-4 rounded-xl text-center border border-red-500/20">
                    {error}
                </div>
            )}

            <div className="glass-card rounded-3xl p-8 space-y-8">
                {/* User Info */}
                <div className="grid grid-cols-2 gap-6 text-sm pb-6 border-b border-white/10">
                    <div>
                        <span className="text-steel block mb-1">Student Name</span>
                        <span className="font-semibold text-white text-lg">{user.fullName}</span>
                    </div>
                    <div>
                        <span className="text-steel block mb-1">CMS ID</span>
                        <span className="font-semibold text-white text-lg">{user.cmsId}</span>
                    </div>
                </div>

                {/* Main Menu Section */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-primary flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        Main Menu Selections
                    </h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        {mainMenuVotes.map((v, i) => (
                            <div key={i} className="flex flex-col py-3 border-b border-white/5 last:border-0 hover:bg-white/5 px-3 rounded-lg transition-colors">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <span className="font-medium w-24 text-steel">{v.day}</span>
                                        <span className="w-20 uppercase text-[10px] tracking-wider font-bold text-white/40 bg-white/5 py-1 px-2 rounded text-center">{v.meal}</span>
                                    </div>
                                    <span className="flex-1 text-right font-medium text-mist truncate pl-4">
                                        {v.selectedOptionId === 'custom' ? `"${v.customOptionValue}"` : getName(v.selectedOptionId, false, v.meal, v.day)}
                                    </span>
                                </div>
                                {/* Preference Tags */}
                                {(v.wantsBoth || v.wantsExtra) && (
                                    <div className="flex justify-end gap-2 mt-1">
                                        {v.wantsBoth && (
                                            <span className="text-[10px] px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/20">
                                                + Wants Both
                                            </span>
                                        )}
                                        {v.wantsExtra && (
                                            <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-300 rounded border border-amber-500/20">
                                                + Extra Serving
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ramadan Section */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-primary flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        Ramadan Selections
                    </h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        {ramadanMenuVotes.map((v, i) => (
                            <div key={i} className="flex flex-col py-3 border-b border-white/5 last:border-0 hover:bg-white/5 px-3 rounded-lg transition-colors">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <span className="font-medium w-24 text-steel">{v.day}</span>
                                        <span className="w-20 uppercase text-[10px] tracking-wider font-bold text-white/40 bg-white/5 py-1 px-2 rounded text-center">{v.meal}</span>
                                    </div>
                                    <span className="flex-1 text-right font-medium text-mist truncate pl-4">
                                        {v.selectedOptionId === 'custom' ? `"${v.customOptionValue}"` : getName(v.selectedOptionId, true, v.meal, v.day)}
                                    </span>
                                </div>
                                {/* Preference Tags */}
                                {(v.wantsBoth || v.wantsExtra) && (
                                    <div className="flex justify-end gap-2 mt-1">
                                        {v.wantsBoth && (
                                            <span className="text-[10px] px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/20">
                                                + Wants Both
                                            </span>
                                        )}
                                        {v.wantsExtra && (
                                            <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-300 rounded border border-amber-500/20">
                                                + Extra Serving
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center pt-4">
                <Button variant="ghost" onClick={() => router.back()} disabled={isSubmitting} className="text-steel hover:text-white hover:bg-white/5">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back to Edit
                </Button>

                <Button
                    className="bg-white text-obsidian hover:bg-mist px-10 h-12 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                        </>
                    ) : (
                        <>
                            Submit Final Vote <CheckCircle className="ml-2 h-4 w-4 text-emerald-600" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
