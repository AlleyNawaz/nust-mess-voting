"use client";

import { useState, useEffect } from "react";
import { useVoting } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DAYS, MAIN_MENU, RAMADAN_MENU } from "@/lib/data"; // Updated import
import { MealType, LogicalMenu } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, ArrowRight, ArrowLeft, Utensils, AlertCircle } from "lucide-react";
// Removed UserForm import as we redirect to /verify now

export default function VotingPage() {
    const { user, phase, setPhase, addVote, getVote } = useVoting();
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(0);
    const [currentDayIndex, setCurrentDayIndex] = useState(0);

    // Redirect to verification if no user found
    useEffect(() => {
        if (!user) {
            router.replace("/verify");
        }
    }, [user, router]);

    // Don't render anything if redirecting
    if (!user) {
        return null;
    }

    const currentDay = DAYS[currentDayIndex];
    const isMainPhase = phase === 'main';

    const getMealType = (step: number, isRamadan: boolean): MealType => {
        if (!isRamadan) {
            if (step === 0) return 'breakfast';
            if (step === 1) return 'lunch';
            return 'dinner';
        } else {
            if (step === 0) return 'sehri';
            if (step === 1) return 'iftari';
            return 'dinner';
        }
    }

    const currentMeal = getMealType(currentStep, !isMainPhase);

    // Helper to get logic object safely
    const getMenuLogic = (): LogicalMenu | undefined => {
        if (isMainPhase) {
            const dayData = MAIN_MENU.find(d => d.day === currentDay);
            // @ts-ignore
            return dayData?.meals[currentMeal];
        } else {
            // NEW: Weekly Ramadan Menu Logic
            const dayData = RAMADAN_MENU.find(d => d.day === currentDay);
            // @ts-ignore
            return dayData?.meals[currentMeal];
        }
    }

    const menuData = getMenuLogic();
    const options = menuData?.items || [];
    const menuType = menuData?.type || 'single';

    const currentVote = getVote(phase === 'main' ? 'main' : 'ramadan', currentDay, currentMeal);

    const handleSelect = (optionId: string, customValue?: string) => {
        addVote(phase === 'main' ? 'main' : 'ramadan', {
            day: currentDay,
            meal: currentMeal,
            selectedOptionId: optionId,
            customOptionValue: customValue,
            wantsBoth: currentVote?.wantsBoth, // Preserve checkbox state
            wantsExtra: currentVote?.wantsExtra
        });
    };

    const toggleExtra = (type: 'both' | 'extra') => {
        if (!currentVote) return;

        addVote(phase === 'main' ? 'main' : 'ramadan', {
            ...currentVote,
            wantsBoth: type === 'both' ? !currentVote.wantsBoth : currentVote.wantsBoth,
            wantsExtra: type === 'extra' ? !currentVote.wantsExtra : currentVote.wantsExtra
        });
    };

    // Auto-select for 'both' type if not already set
    if (menuType === 'both' && !currentVote) {
        if (options.length > 0) {
            handleSelect(options[0].id);
        }
    }


    const next = () => {
        if (currentDayIndex < DAYS.length - 1) {
            setCurrentDayIndex(prev => prev + 1);
        } else {
            if (currentStep < 2) {
                setCurrentStep(prev => prev + 1);
                setCurrentDayIndex(0);
            } else {
                if (phase === 'main') {
                    setPhase('ramadan');
                    setCurrentStep(0);
                    setCurrentDayIndex(0);
                } else {
                    setPhase('completed');
                    router.push("/vote/summary");
                }
            }
        }
    };

    const prev = () => {
        if (currentDayIndex > 0) {
            setCurrentDayIndex(prev => prev - 1);
        } else {
            if (currentStep > 0) {
                setCurrentStep(prev => prev - 1);
                setCurrentDayIndex(DAYS.length - 1);
            } else {
                if (phase === 'ramadan') {
                    setPhase('main');
                    setCurrentStep(2);
                    setCurrentDayIndex(DAYS.length - 1);
                }
            }
        }
    };

    const totalStepsPhase = 3 * 7;
    const currentProgress = (currentStep * 7) + (currentDayIndex + 1);
    const progressPercent = (currentProgress / totalStepsPhase) * 100;

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">

            {/* Top Info & Progress */}
            <div className="w-full max-w-2xl mb-10 space-y-6">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                            {phase === 'main' ? 'Phase 1 • Regular Menu' : 'Phase 2 • Ramadan Menu'}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                            <span className="text-mist">{currentDay}</span>
                            <span className="text-white/20">/</span>
                            <span className="capitalize text-primary-glow drop-shadow-lg">{currentMeal}</span>
                        </h2>
                    </div>
                </div>
                <div className="h-2 w-full bg-white/5 border border-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-primary-glow shadow-[0_0_15px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            {/* Instruction Banner */}
            <div className="w-full max-w-2xl mb-4">
                {menuType === 'both' && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 p-3 rounded-xl flex items-center gap-3 text-sm">
                        <Utensils className="w-4 h-4" />
                        <span>Both items are served. No selection needed.</span>
                    </div>
                )}
                {menuType === 'alternative' && (
                    <div className="bg-white/5 border border-white/10 text-mist p-3 rounded-xl flex items-center gap-3 text-sm">
                        <AlertCircle className="w-4 h-4 text-primary" />
                        <span>Please select ONE option.</span>
                    </div>
                )}
            </div>


            {/* Main Card */}
            <div className="w-full max-w-2xl glass-card rounded-3xl p-6 md:p-8 transition-all duration-300">
                <div className="space-y-4">

                    {/* OPTIONS RENDER */}
                    {options.map((opt) => {
                        const isSelected = currentVote?.selectedOptionId === opt.id;

                        if (menuType === 'both') {
                            return (
                                <div key={opt.id} className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-white">{opt.name}</h3>
                                        <p className="text-sm text-emerald-200/60">Included in menu</p>
                                    </div>
                                </div>
                            )
                        }

                        // Normal Alternative Selection
                        return (
                            <div
                                key={opt.id}
                                onClick={() => handleSelect(opt.id)}
                                className={cn(
                                    "group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between",
                                    isSelected
                                        ? "bg-primary/20 border-primary/50 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                                        : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                                )}
                            >
                                <div className="flex-1 pr-6">
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <h3 className={cn("font-semibold text-lg transition-colors", isSelected ? "text-white" : "text-mist group-hover:text-white")}>
                                            {opt.name}
                                        </h3>
                                        {opt.isRecommended && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                Recommended
                                            </span>
                                        )}
                                    </div>
                                    {opt.description && (
                                        <p className="text-sm text-steel group-hover:text-mist/80 transition-colors">
                                            {opt.description}
                                        </p>
                                    )}
                                </div>
                                <div className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center transition-all border",
                                    isSelected
                                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                                        : "bg-transparent border-steel/30 group-hover:border-white/50"
                                )}>
                                    {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                                </div>
                            </div>
                        );
                    })}

                    {/* Extras Checkbox (Only for Alternative) */}
                    {menuType === 'alternative' && currentVote && currentVote.selectedOptionId !== 'custom' && (
                        <div className="pt-2 pl-2">
                            <h4 className="text-xs font-bold text-steel/50 uppercase tracking-widest mb-3">Optional Preferences</h4>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-all",
                                    currentVote.wantsBoth ? "bg-primary border-primary text-white" : "border-white/20 bg-white/5 group-hover:border-white/40")}
                                    onClick={() => toggleExtra('both')}
                                >
                                    {currentVote.wantsBoth && <Check className="w-3 h-3" />}
                                </div>
                                <span className="text-sm text-mist group-hover:text-white transition-colors">I want both options (if possible)</span>
                            </label>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="relative py-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-widest font-medium">
                            <span className="bg-charcoal/80 px-4 text-steel">Or Suggest Option</span>
                        </div>
                    </div>

                    {/* Custom Input */}
                    <div className={cn(
                        "transition-all duration-300 rounded-xl p-0.5",
                        currentVote?.selectedOptionId === 'custom'
                            ? "bg-gradient-to-r from-primary/50 to-primary-glow/50 shadow-lg"
                            : "bg-transparent"
                    )}>
                        <input
                            type="text"
                            placeholder="Type a custom meal suggestion..."
                            className={cn(
                                "w-full rounded-xl text-sm px-5 py-4 placeholder:text-steel/50 focus:outline-none text-white transition-all",
                                currentVote?.selectedOptionId === 'custom'
                                    ? "bg-charcoal"
                                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                            )}
                            value={currentVote?.selectedOptionId === 'custom' ? currentVote.customOptionValue : ''}
                            onChange={(e) => handleSelect('custom', e.target.value)}
                            onFocus={() => handleSelect('custom', currentVote?.customOptionValue || '')}
                        />
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex w-full max-w-2xl justify-between mt-8">
                <Button
                    variant="ghost"
                    onClick={prev}
                    disabled={currentStep === 0 && currentDayIndex === 0 && phase === 'main'}
                    className="text-steel hover:text-white hover:bg-white/5 px-6 h-12 rounded-xl"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>

                <Button
                    onClick={next}
                    disabled={!currentVote}
                    className={cn(
                        "h-12 px-8 rounded-full text-base font-semibold shadow-lg transition-all active:scale-95",
                        !currentVote
                            ? "bg-white/10 text-white/20 cursor-not-allowed"
                            : "bg-white text-obsidian hover:bg-mist hover:scale-105 shadow-white/10"
                    )}
                >
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
