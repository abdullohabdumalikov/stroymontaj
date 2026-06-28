"use client";

import { motion } from "framer-motion";
import { CountupNumber } from "./CountupNumber";
import { RevealSection } from "./RevealSection";
import { SectionTitle } from "./SectionTitle";
import { useTranslations } from "./useTranslations";

const reveal = {
    hidden: { opacity: 0, y: 44 },
    visible: { opacity: 1, y: 0 },
};

export function AboutSection() {
    const { t } = useTranslations();

    const stats = [
        { value: 20, label: t("about.stats.experience") },
        { value: 50, label: t("about.stats.projects") },
        { value: 100, label: t("about.stats.clients") },
        { value: 40, label: t("about.stats.specialists") },
    ];

    return (
        <RevealSection
            id="about"
            className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:gap-12 sm:px-8 sm:py-24 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-12"
        >
            <div>
                <SectionTitle prefix={t("about.title")} accentText={t("about.titleAccent")} align="left" />
                <div className="mt-6 max-w-xl space-y-5 text-base leading-7 text-[#6f6963] sm:mt-8 sm:space-y-7 sm:text-lg sm:leading-8">
                    <p>{t("about.text1")}</p>
                    <p>{t("about.text2")}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {stats.map((item, index) => (
                    <motion.div
                        key={item.label}
                        variants={reveal}
                        transition={{ duration: 0.55, delay: index * 0.08 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        className="rounded-xl border border-[#eee8e2] bg-white p-5 shadow-[0_12px_40px_rgba(36,31,26,0.06)] transition-colors hover:border-[#F39A3D]/60 sm:rounded-2xl sm:p-8"
                    >
                        <div className="text-3xl font-black text-[#F39A3D] sm:text-4xl">
                            <CountupNumber target={item.value} suffix="+" duration={2} />
                        </div>
                        <div className="mt-2 font-serif text-xs font-bold text-[#3b342e] sm:mt-3 sm:text-sm">
                            {item.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </RevealSection>
    );
}
