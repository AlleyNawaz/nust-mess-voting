import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Deep Premium Palette
                obsidian: "#0B0B0F", // Base
                charcoal: "#14121F", // Secondary
                graphite: "#1E1B36", // Cards
                midnight: "#2A1E44", // Deep Accent

                // Accents
                primary: {
                    DEFAULT: "#7C3AED", // Violet-600
                    glow: "#6D28D9",
                    foreground: "#FFFFFF"
                },

                // Text
                mist: "#E2E8F0", // Slate-200
                steel: "#94A3B8", // Slate-400
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            backgroundImage: {
                'premium-gradient': 'radial-gradient(circle at top, #1E1B36 0%, #0B0B0F 100%)',
                'glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
            }
        },
    },
    plugins: [],
};
export default config;
