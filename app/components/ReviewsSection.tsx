"use client";

import { motion } from "framer-motion";
import { RevealSection } from "./RevealSection";
import { SectionTitle } from "./SectionTitle";
import { useTranslations } from "./useTranslations";
import { TextReveal } from "./TextReveal";

const testimonials = [
    {
        name: "Azimov S.",
        role: "Tadbirkor",
        text: "СТРОЙ МОНТАЖ билан ишлаш жуда кўнгилли тажриба бўлди. Сифатли иш ва ёгутиш муддатлари.",
        rating: 5,
    },
    {
        name: "Karimova N.",
        role: "Loyihachi",
        text: "Профессиональный подход и внимание к деталям. Рекомендую для масштабных проектов.",
        rating: 5,
    },
    {
        name: "Rahimov T.",
        role: "Menejer",
        text: "Очень доволен результатом. Команда работает слаженно и всегда на связи.",
        rating: 5,
    },
];

export function ReviewsSection() {
    const { t } = useTranslations();

    return (
        <RevealSection id="reviews" className="bg-[#fbfaf8] px-4 py-16 sm:px-8 sm:py-20">
            <div className="mx-auto max-w-4xl text-center">
                <SectionTitle prefix={t("reviews.title")} accentText={t("reviews.titleAccent")} />
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-5 text-base leading-7 text-[#6f6963] sm:mt-6 sm:text-lg sm:leading-8"
                >
                    {t("reviews.text")}
                </motion.p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:mt-14 sm:gap-6 md:grid-cols-3">
                {testimonials.map((item, i) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 0.6,
                            delay: i * 0.12,
                            ease: [0.33, 1, 0.68, 1],
                        }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="rounded-2xl border border-[#eee8e2] bg-white p-6 shadow-[0_8px_30px_rgba(36,31,26,0.05)] transition-colors hover:border-[#F39A3D]/40 hover:shadow-[0_16px_40px_rgba(243,154,61,0.08)] sm:p-8"
                    >
                        <div className="mb-4 flex gap-1">
                            {Array.from({ length: item.rating }).map((_, j) => (
                                <motion.span
                                    key={j}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12 + j * 0.05 + 0.3, type: "spring", stiffness: 300 }}
                                    className="text-[#F39A3D]"
                                >
                                    ★
                                </motion.span>
                            ))}
                        </div>
                        <p className="text-sm leading-7 text-[#6f6963] sm:text-base">
                            &ldquo;{item.text}&rdquo;
                        </p>
                        <div className="mt-5 border-t border-[#eee8e2] pt-4">
                            <p className="font-serif text-sm font-black text-[#211c17]">
                                {item.name}
                            </p>
                            <p className="text-xs text-[#8a8178]">{item.role}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </RevealSection>
    );
}
