import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",

                // Hydra Theme Colors
                hydra: {
                    bg: "#302C42",      // Main Background
                    dark: "#211E2E",    // Card/Depth Background
                    purple: "#8176AF",  // Primary Gradient Start
                    lavender: "#C0B7E8",// Primary Gradient End
                },

                // Keep generic utilities pointing to Hydra theme defaults
                void: "#302C42",
                nebula: {
                    500: "#8176AF",
                    600: "#7064a3",
                    400: "#C0B7E8",
                },
                starlight: "#F8FAFC",
                dust: "#94A3B8",

                glass: {
                    DEFAULT: "rgba(255, 255, 255, 0.03)",
                    hover: "rgba(255, 255, 255, 0.06)",
                    border: "rgba(192, 183, 232, 0.33)", // Hydra border color
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                // The Signature Hydra Shape
                hydra: "100px 100px 100px 240px",
                "hydra-sm": "40px", // Standard rounded corners for cards
            },
            fontFamily: {
                sans: ["Montserrat", "pk-inter", "sans-serif"],
                montserrat: ["Montserrat", "sans-serif"],
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                // Kinetic Animations
                "orb-float": {
                    "0%, 100%": { transform: "translate(0, 0) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                },
                "orb-float-delayed": {
                    "0%, 100%": { transform: "translate(0, 0) scale(1)" },
                    "33%": { transform: "translate(-30px, 50px) scale(1.1)" },
                    "66%": { transform: "translate(20px, -20px) scale(0.9)" },
                },
                "glow-pulse": {
                    "0%, 100%": { opacity: "0.5", filter: "blur(40px)" },
                    "50%": { opacity: "1", filter: "blur(60px)" },
                },
                "assemble": {
                    "from": { opacity: "0", transform: "translateY(20px) scale(0.9)" },
                    "to": { opacity: "1", transform: "translateY(0) scale(1)" },
                },
                "laser-line": {
                    "0%": { width: "0%", left: "50%" },
                    "100%": { width: "100%", left: "0%" },
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "orb-float": "orb-float 20s ease-in-out infinite",
                "orb-float-delayed": "orb-float-delayed 25s ease-in-out infinite reverse",
                "glow-pulse": "glow-pulse 4s ease-in-out infinite",
                "assemble": "assemble 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "laser": "laser-line 0.4s ease-out forwards",
            },
            backgroundImage: {
                "hydra-gradient": "linear-gradient(90deg, #8176AF 0%, #C0B7E8 100%)",
                "hydra-text": "linear-gradient(91.57deg, #C0B7E8 -1.02%, #8176AF 36.25%)",
                "hydra-radial": "radial-gradient(50% 50% at 50% 50%, #433D60 0%, #211E2E 100%)",
                "glass-gradient": "linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
            },
        },
    },
    plugins: [tailwindAnimate],
};

export default config;
