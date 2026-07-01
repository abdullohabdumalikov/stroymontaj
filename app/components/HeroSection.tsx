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
                        className="block bg-gradient-to-r from-[#EA580C] to-[#F97316] bg-clip-text text-transparent"
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 2.8 }}
                    className="mt-10 flex items-center gap-6"
                >
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-[#64748B] to-[#94A3B8] shadow-sm" />
                            ))}
                        </div>
                        <span className="text-xs font-semibold text-[#64748B]">50+ jamoa</span>
                    </div>
                    <div className="h-8 w-px bg-[#E2E8F0]" />
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <svg key={i} className="h-4 w-4 text-[#EA580C]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="ml-1 text-xs font-semibold text-[#64748B]">4.9/5</span>
                    </div>
                </motion.div>
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

                {/* Floating stats card */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, delay: 2.8, type: "spring", stiffness: 120 }}
                    className="absolute -bottom-6 -left-4 glass rounded-2xl px-5 py-4 shadow-xl sm:-bottom-8 sm:-left-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#EA580C] to-[#F97316] text-white shadow-lg shadow-[#EA580C]/25">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#0F172A]">20+ Yil tajriba</p>
                            <p className="text-xs text-[#64748B]">Ishonchli hamkor</p>
                        </div>
                    </div>
                </motion.div>

                {/* Year badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 3.2, type: "spring" }}
                    className="absolute -right-3 top-6 rounded-full bg-[#0F172A] px-4 py-2 text-xs font-bold text-white shadow-lg sm:-right-4 sm:top-8"
                >
                    Est. 2004
                </motion.div>
            </motion.div>
        </section>
    );
}
