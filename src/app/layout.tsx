import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as requested
import "./globals.css";
import { VotingProvider } from "@/lib/store";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";

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
          {/* New Sticky Header */}
          <Header />

          <main className="flex-1 relative z-10">
            {children}
          </main>

        </VotingProvider>
      </body>
    </html>
  );
}
