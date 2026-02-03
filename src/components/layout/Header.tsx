"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0B0B0F]/80 border-b border-white/5 transition-all duration-300">
            <div className="w-full max-w-5xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">

                {/* Logo Lockup - Always Visible & Stable */}
                <Link href="/" className="flex items-center gap-3 md:gap-4 group">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform group-hover:scale-105">
                        <Image
                            src="/nustLogo.png"
                            alt="NUST Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="text-left flex flex-col">
                        <h2 className="text-sm md:text-lg font-bold text-white leading-none tracking-tight">NUST Hostels</h2>
                        <p className="text-[10px] md:text-xs text-indigo-200/60 font-medium tracking-wide uppercase">Mess Committee</p>
                    </div>
                </Link>

                {/* Right Side - Subtle Context or Actions */}
                <div className="hidden md:block text-right">
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold tracking-widest uppercase">
                        Voting 2026
                    </span>
                </div>

            </div>
        </header>
    );
}
