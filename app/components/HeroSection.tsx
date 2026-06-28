"use client";

import { motion } from "framer-motion";
import { AnchorButton } from "./AnchorButton";
import { useTranslations } from "./useTranslations";

const reveal = {
    hidden: { opacity: 0, y: 44 },
    visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
    const { t } = useTranslations();

    return (
        <section
            id="home"
            className="mx-auto grid min-h-[calc(100svh-68px)] w-full max-w-7xl items-center gap-8 px-4 pb-12 pt-24 sm:min-h-[calc(100svh-72px)] sm:gap-12 sm:px-8 sm:pb-16 sm:pt-28 lg:grid-cols-[0.95fr_1.05fr] lg:px-12"
        >
            <motion.div
                variants={reveal}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-xl"
            >
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.38em] text-[#8a8178] sm:mb-5 sm:text-xs">
                    {t("hero.subtitle")}
                </p>
                <h1 className="font-serif font-black leading-[0.95] text-[#211c17]" style={{ fontSize: "clamp(2.6rem,9vw,6.5rem)" }}>
                    {t("hero.title")}
                    <br />
                    <span
                        className="block text-[#F39A3D]"
                        style={{ fontSize: "clamp(2.8rem,10vw,5.6rem)" }}
                    >
                        {t("hero.accent")}
                    </span>
                </h1>
                <p className="mt-6 max-w-lg text-base leading-7 text-[#6f6963] sm:mt-8 sm:text-lg sm:leading-8">
                    {t("hero.description")}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                    <AnchorButton href="#contact" variant="primary">
                        {t("hero.cta1")}
                    </AnchorButton>
                    <AnchorButton href="#projects" variant="secondary">
                        {t("hero.cta2")}
                    </AnchorButton>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className="relative w-full"
            >
                <div className="absolute -inset-4 rounded-[2rem] bg-[#F39A3D]/10 blur-3xl sm:-inset-6" />
                <img
                    className="relative h-[260px] w-full rounded-[1.2rem] object-cover shadow-[0_20px_60px_rgba(36,31,26,0.18)] xs:h-[300px] sm:h-[420px] lg:h-[520px] sm:rounded-[1.5rem]"
                    src="/hero_construction.jpg"
                    alt="Qurilish loyihasi - zamonaviy bino"
                />
                {/* Floating badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="absolute -bottom-4 -left-3 flex items-center gap-3 rounded-2xl border border-[#eee8e2] bg-white px-4 py-3 shadow-[0_12px_35px_rgba(36,31,26,0.12)] sm:-bottom-5 sm:-left-5"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F39A3D] text-lg">🏗️</span>
                    <div>
                        <p className="text-[11px] font-black text-[#211c17]">20+ Yil tajriba</p>
                        <p className="text-[10px] text-[#8a8178]">Ishonchli sherik</p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
