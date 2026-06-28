"use client";

import { motion } from "framer-motion";
import { Home, Wrench, Compass } from "lucide-react";
import { RevealSection } from "./RevealSection";
import { SectionTitle } from "./SectionTitle";
import { useTranslations } from "./useTranslations";

const reveal = {
    hidden: { opacity: 0, y: 44 },
    visible: { opacity: 1, y: 0 },
};

export function ServicesSection() {
    const { t } = useTranslations();

    const services = [
        {
            icon: Home,
            title: t("services.service1"),
            text: t("services.service1Desc"),
        },
        {
            icon: Wrench,
            title: t("services.service2"),
            text: t("services.service2Desc"),
        },
        {
            icon: Compass,
            title: t("services.service3"),
            text: t("services.service3Desc"),
        },
    ];

    return (
        <RevealSection id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
            <SectionTitle prefix={t("services.title")} accentText={t("services.titleAccent")} />
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-[#746d66] sm:mt-5 sm:text-base">
                {t("services.subtitle")}
            </p>

            <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-8 md:grid-cols-3">
                {services.map((service, index) => (
                    <motion.article
                        key={service.title}
                        variants={reveal}
                        transition={{ duration: 0.55, delay: index * 0.1 }}
                        whileHover={{ scale: 1.03, y: -6 }}
                        className="group rounded-xl border border-[#eee8e2] bg-white p-6 shadow-[0_12px_40px_rgba(36,31,26,0.05)] transition-colors hover:border-[#F39A3D]/60 sm:rounded-2xl sm:p-9"
                    >
                        <motion.div
                            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F39A3D]/10 text-[#F39A3D] sm:h-12 sm:w-12"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <service.icon size={22} strokeWidth={1.5} />
                        </motion.div>
                        <h3 className="mt-6 font-serif text-lg font-black sm:mt-8 sm:text-xl">
                            {service.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-[#6f6963] sm:mt-5 sm:text-base">
                            {service.text}
                        </p>
                    </motion.article>
                ))}
            </div>
        </RevealSection>
    );
}
