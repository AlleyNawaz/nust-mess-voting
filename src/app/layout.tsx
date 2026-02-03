import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as requested
import "./globals.css";
import { VotingProvider } from "@/lib/store";
import { cn } from "@/lib/utils";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "NUST Mess Menu Voting 2026",
  description: "Official voting portal for NUST Hostels.",
  icons: {
    icon: "/nustLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        inter.variable,
        "antialiased min-h-screen flex flex-col bg-obsidian text-mist"
      )}>
        <VotingProvider>
          {/* Minimal Header */}
          <header className="fixed top-0 left-0 right-0 z-50 py-6 px-6 sm:px-12 pointer-events-none">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
              <div className="flex items-center gap-3 pointer-events-auto">
                <div className="relative w-10 h-10">
                  <Image
                    src="/nustLogo.png"
                    alt="NUST Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="font-semibold text-white tracking-tight text-lg">NUST Hostels</span>
              </div>
              {/* Right Side Content if needed, otherwise empty as per clean request */}
            </div>
          </header>

          <main className="flex-1 relative z-10 pt-20">
            {children}
          </main>

          <footer className="py-8 text-center text-steel/20 text-xs z-10 relative">
            {/* Footer Content Removed as per request */}
          </footer>
        </VotingProvider>
      </body>
    </html>
  );
}
