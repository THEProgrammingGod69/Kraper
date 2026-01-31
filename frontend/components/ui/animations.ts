// Animation presets for consistent motion across the app
import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
};

export const staggerContainer: Variants = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const scaleOnHover = {
    whileHover: { scale: 1.05 },
    transition: { type: "spring" as const, stiffness: 300 }
};

export const slideInLeft: Variants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
};

export const slideInRight: Variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
};

export const pulseGlow = {
    animate: {
        boxShadow: [
            "0 0 20px rgba(129, 118, 175, 0.2)",
            "0 0 40px rgba(192, 183, 232, 0.4)",
            "0 0 20px rgba(129, 118, 175, 0.2)"
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" as const
        }
    }
};
