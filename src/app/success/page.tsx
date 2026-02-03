import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";

export default function SuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 text-center px-4">

            <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-[50px] rounded-full pointer-events-none" />
                <div className="relative bg-obsidian border border-emerald-500/20 p-6 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                    <CheckCircle className="w-16 h-16 text-emerald-500 stroke-[1.5]" />
                </div>
            </div>

            <div className="space-y-4 max-w-lg">
                <h1 className="text-4xl font-bold text-white tracking-tight">Vote Record Saved</h1>
                <p className="text-steel text-lg leading-relaxed">
                    Thank you for participating in the Mess Menu Voting 2026.
                    Your preferences have been securely encrypted and recorded in the official ledger.
                </p>
            </div>

            <div className="pt-8">
                <Link href="/">
                    <Button variant="outline" className="h-12 px-8 rounded-full border-white/10 text-mist hover:bg-white/5 hover:text-white transition-all">
                        <Home className="mr-2 w-4 h-4" /> Return to Portal
                    </Button>
                </Link>
            </div>
        </div>
    );
}
