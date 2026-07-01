"use client";

import { motion } from "framer-motion";

export function LogoText({
    className = "",
    animate = false,
}: {
    className?: string;
    animate?: boolean;
}) {
    const Wrapper = animate ? motion.div : "div";
    const wrapperProps = animate
        ? {
            initial: { opacity: 0, x: -10 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.5 },
        }
        : {};

    return (
        <Wrapper className={`flex flex-col leading-none ${className}`} {...(wrapperProps as Record<string, unknown>)}>
            <span
                className="text-[1.1em] font-black tracking-[-0.02em] text-[#0F172A]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
            >
                СТРОЙ
            </span>
            <span
                className="text-[0.85em] font-bold tracking-[0.08em] text-[#94A3B8]"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
                МОНТАЖ
            </span>
        </Wrapper>
    );
}
