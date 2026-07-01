"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CountupNumber } from "./CountupNumber";
import { RevealSection } from "./RevealSection";
import { SectionTitle } from "./SectionTitle";
import { useTranslations } from "./useTranslations";

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            delay: i * 0.12,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    }),
};

const stats = [
    { value: 20, label: "Yillik tajriba", icon: "experience" },
    { value: 50, label: "Tugallangan loyihalar", icon: "projects" },
    { value: 100, label: "Mamnun mijozlar", icon: "clients" },
    { value: 40, label: "Malakali mutaxassis", icon: "specialists" },
];

const statIcons: Record<string, React.ReactNode> = {
    experience: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    projects: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    ),
    clients: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    ),
    specialists: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    ),
};

export function AboutSection() {
    const { t } = useTranslations();
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

    return (
        <RevealSection
            id="about"
            className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:gap-16 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-12"
        >
            {/* Decorative gradient blob */}
            <motion.div
                style={{ y: bgY }}
                className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-[#EA580C]/5 to-[#F97316]/3 blur-3xl"
            />

            <div className="relative z-10">
                <SectionTitle prefix={t("about.title")} accentText={t("about.titleAccent")} align="left" />
                <div className="mt-8 max-w-xl space-y-6 text-base leading-relaxed text-[#64748B] sm:mt-10 sm:text-lg">
                    <p>{t("about.text1")}</p>
                    <p>{t("about.text2")}</p>
                </div>

                {/* Feature list */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-8 flex flex-wrap gap-3"
                >
                    {["Sifat kafolati", "Zamonaviy texnologiya", "Professional jamoa"].map((tag, i) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.4 }}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#EA580C]/10 px-4 py-1.5 text-xs font-semibold text-[#EA580C]"
                        >
                            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {tag}
                        </motion.span>
                    ))}
                </motion.div>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-5">
                {stats.map((item, index) => (
                    <motion.div
                        key={item.label}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover={{ scale: 1.04, y: -6 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="group relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#EA580C]/30 hover:shadow-lg sm:rounded-2xl sm:p-7"
                    >
                        {/* Gradient accent line */}
                        <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#EA580C] to-[#F97316] transition-all duration-300 group-hover:w-full" />

                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EA580C]/10 text-[#EA580C] sm:h-12 sm:w-12">
                            {statIcons[item.icon]}
                        </div>
                        <div className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
                            <CountupNumber target={item.value} suffix="+" duration={2} />
                        </div>
                        <div className="mt-2 text-xs font-medium text-[#64748B] sm:mt-3 sm:text-sm">
                            {item.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </RevealSection>
    );
}
