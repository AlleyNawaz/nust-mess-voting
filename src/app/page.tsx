import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Utensils, Moon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">

      {/* Background Ambient Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-midnight/40 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-10 flex flex-col items-center">

        {/* Logo and Title */}
        <div className="space-y-6 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <Image
              src="/nustLogo.png"
              alt="NUST Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            NUST Mess Menu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-steel">Voting 2026</span>
          </h1>

          <p className="text-lg md:text-xl text-steel max-w-2xl mx-auto leading-relaxed">
            Welcome to the annual decision process for the hostel mess.
            Your vote determines the Regular and Ramadan menus for the entire upcoming year.
          </p>
        </div>

        {/* Steps / Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left w-full">
          <div className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center mb-4 border border-white/10">
              <Utensils className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Phase 1: Regular Menu</h3>
            <p className="text-steel text-sm leading-relaxed">
              Vote for daily Breakfast, Lunch, and Dinner options.
              One selection per meal is allowed.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center mb-4 border border-white/10">
              <Moon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Phase 2: Ramadan Menu</h3>
            <p className="text-steel text-sm leading-relaxed">
              After regular menu, proceed to select Sehri and Iftari options
              for the Holy Month.
            </p>
          </div>
        </div>

        <div className="pt-8">
          <Link href="/vote">
            <Button size="lg" className="bg-white text-obsidian hover:bg-mist h-14 px-10 rounded-full text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-transform hover:scale-105">
              Start Voting
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-4 text-xs text-steel/60">
            Only verified NUST students can participate.
          </p>
        </div>

      </div>
    </div>
  );
}
