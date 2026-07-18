"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnchorButton } from "./AnchorButton";
import { useTranslations } from "./useTranslations";
import { FloatingShapes } from "./FloatingShapes";

export function HeroSection() {
    const { t } = useTranslations();
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative mx-auto grid min-h-[calc(100svh-68px)] w-full max-w-7xl items-center gap-8 px-4 pb-12 pt-24 sm:min-h-[calc(100svh-72px)] sm:gap-12 sm:px-8 sm:pb-16 sm:pt-28 lg:grid-cols-[0.95fr_1.05fr] lg:px-12"
        >
            <FloatingShapes />

            <motion.div
                style={{ y: textY, opacity }}
                className="relative z-10 max-w-xl"
            >
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#EA580C]/10 px-4 py-2"
                >
                    <span className="h-2 w-2 rounded-full bg-[#EA580C] animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#EA580C]">
                        {t("hero.subtitle")}
                    </span>
                </motion.div>

                <h1
                    className="font-black leading-[0.95] text-[#0F172A]"
                    style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2.2rem,8vw,5.5rem)" }}
                >
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
                        className="block"
                    >
                        {t("hero.title")}
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
                        className="block text-[#F39A3D] bg-clip-text"
                        style={{ fontSize: "clamp(2.4rem,9vw,5rem)" }}
                    >
                        {t("hero.accent")}
                    </motion.span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 2.4 }}
                    className="mt-6 max-w-lg text-base leading-relaxed text-[#64748B] sm:mt-8 sm:text-lg"
                >
                    {t("hero.description")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 2.6 }}
                    className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
                >
                    <AnchorButton href="#contact" variant="primary">
                        {t("hero.cta1")}
                    </AnchorButton>
                    <AnchorButton href="#projects" variant="secondary">
                        {t("hero.cta2")}
                    </AnchorButton>
                </motion.div>

                {/* Trust badges */}

            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full"
            >
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#EA580C]/10 to-[#F97316]/5 blur-3xl sm:-inset-6" />
                <motion.div
                    style={{ y: imageY, scale: imageScale }}
                    className="relative overflow-hidden rounded-[1.2rem] sm:rounded-[1.5rem]"
                >
                    <img
                        className="h-[260px] w-full object-cover shadow-[0_20px_60px_rgba(15,23,42,0.18)] xs:h-[300px] sm:h-[420px] lg:h-[520px]"
                        src="/hero_construction.jpg"
                        alt="Qurilish loyihasi - zamonaviy bino"
                        loading="eager"
                    />
                    {/* Premium gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/20 via-transparent to-transparent" />
                </motion.div>



                {/* Year badge */}

            </motion.div>
        </section>
    );
}
