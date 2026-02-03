"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Utensils, Moon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/vote");
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden text-center selection:bg-indigo-500/30">

      {/* 1. Header Section */}
      <header className="w-full max-w-5xl mx-auto p-6 flex flex-col md:flex-row items-center justify-center md:justify-between py-12 md:py-16 gap-6 z-10">

        {/* Logo Lockup */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]">
            <Image
              src="/nustLogo.png"
              alt="NUST Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="text-left hidden md:block">
            <h2 className="text-xl font-bold text-white leading-none tracking-tight">NUST Hostels</h2>
            <p className="text-sm text-indigo-200/60 font-medium tracking-wide uppercase">Mess Committee</p>
          </div>
        </div>

        {/* Title (Mobile Centered / Desktop Right Aligned) */}
        <div className="text-center md:text-right">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold tracking-widest uppercase mb-2">
            Official Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Mess Menu Voting <span className="text-indigo-400">2026</span>
          </h1>
        </div>
      </header>


      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl px-6 pb-20 z-10 flex flex-col items-center gap-8">

        {/* 2. Intro Card (Glassmorphism) */}
        <div className="glass-card w-full p-8 md:p-10 rounded-3xl text-left relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

          <h3 className="text-xl font-semibold text-white mb-3 relative z-10">Welcome, Student.</h3>
          <p className="text-lg text-indigo-100/80 leading-relaxed max-w-2xl relative z-10">
            This is the official annual voting portal for NUST hostels.
            Your vote directly decides the <span className="text-white font-medium">Regular</span> and <span className="text-white font-medium">Ramadan</span> mess menus for 2026.
            Please vote responsibly.
          </p>
        </div>


        {/* 3. Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Phase 1 */}
          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl text-left flex flex-col gap-3 hover:bg-white/10 transition-colors cursor-default">
            <div className="w-10 h-10 rounded-full bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold flex items-center gap-2">
                Phase 1: Regular Menu
              </h4>
              <p className="text-sm text-slate-400 mt-1">
                Breakfast → Lunch → Dinner (Weekly)
              </p>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl text-left flex flex-col gap-3 hover:bg-white/10 transition-colors cursor-default">
            <div className="w-10 h-10 rounded-full bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold flex items-center gap-2">
                Phase 2: Ramadan Menu
              </h4>
              <p className="text-sm text-slate-400 mt-1">
                Sehri → Iftari → Dinner (Weekly)
              </p>
            </div>
          </div>
        </div>


        {/* 4. CTA Button */}
        <div className="pt-8 flex flex-col items-center gap-4 w-full">
          <Button
            onClick={handleStart}
            className="w-full md:w-auto min-w-[240px] h-14 bg-white hover:bg-indigo-50 text-indigo-950 font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
          >
            Start Voting
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* 5. Footer Note */}
          <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
            Only verified NUST students can participate
          </p>
        </div>

      </main>

    </div>
  );
}
