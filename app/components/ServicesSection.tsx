"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealSection } from "./RevealSection";
import { SectionTitle } from "./SectionTitle";
import { useTranslations } from "./useTranslations";

const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.7,
            delay: i * 0.15,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    }),
};

const serviceIcons = [
    <svg key="home" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>,

    <svg key="wrench" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>,
    
    <svg key="compass" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>,
];

function ServiceCard({
    service,
    index,
}: {
    service: { icon: number; title: string; text: string; features: string[] };
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [6, -6]);
    const rotateY = useTransform(x, [-100, 100], [-6, 6]);

    function handleMouse(e: React.MouseEvent) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    }

    function handleLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.article
            ref={ref}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ rotateX, rotateY, perspective: 800 }}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            className="group relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-7 transition-all duration-200 hover:border-[#EA580C]/30 hover:shadow-xl sm:p-9"
        >
            {/* Gradient accent line */}
            <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#EA580C] to-[#F97316] transition-all duration-300 group-hover:w-full" />

            {/* Icon */}
            <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EA580C]/10 to-[#F97316]/5 text-[#EA580C] transition-all duration-200 group-hover:scale-110 group-hover:bg-[#EA580C] group-hover:text-white sm:h-16 sm:w-16">
                    {serviceIcons[service.icon]}
                </div>
            </div>

            {/* Content */}
            <h3 className="mt-6 text-lg font-bold tracking-tight text-[#0F172A] sm:mt-8 sm:text-xl">
                {service.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:mt-4 sm:text-base">
                {service.text}
            </p>

            {/* Feature list */}
            <ul className="mt-5 space-y-2">
                {service.features.map((feature, i) => (
                    <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        className="flex items-center gap-2 text-sm text-[#64748B]"
                    >
                        <svg className="h-4 w-4 flex-shrink-0 text-[#EA580C]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                    </motion.li>
                ))}
            </ul>

            {/* Arrow */}

        </motion.article>
    );
}

export function ServicesSection() {
    const { t } = useTranslations();

    const services = [
        {
            icon: 0,
            title: t("services.service1"),
            text: t("services.service1Desc"),
            features: ["Loyiha ishlab chiqish", "3D modellash", "Texnik hujjatlar"],
        },
        {
            icon: 1,
            title: t("services.service2"),
            text: t("services.service2Desc"),
            features: ["Sifat nazorati", "Xavfsizlik standartlari", "Muddatlar kafolati"],
        },
        {
            icon: 2,
            title: t("services.service3"),
            text: t("services.service3Desc"),
            features: ["Zamonaviy jihozlar", "Malakali jamoa", "24/7 qo'llab-quvvatlash"],
        },
    ];

    return (
        <RevealSection id="services" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-[#EA580C]/3 blur-3xl" />
                <div className="absolute -left-40 bottom-20 h-80 w-80 rounded-full bg-[#F97316]/3 blur-3xl" />
            </div>

            <div className="relative z-10">
                <SectionTitle prefix={t("services.title")} accentText={t("services.titleAccent")} />
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-[#64748B] sm:mt-6 sm:text-base"
                >
                    {t("services.subtitle")}
                </motion.p>

                <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-7 md:grid-cols-3">
                    {services.map((service, index) => (
                        <ServiceCard key={service.title} service={service} index={index} />
                    ))}
                </div>
            </div>
        </RevealSection>
    );
}
