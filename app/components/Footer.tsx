"use client";

import { motion } from "framer-motion";
import { LogoMark } from "./LogoMark";
import { useTranslations } from "./useTranslations";

export function Footer() {
    const { t } = useTranslations();

    const footerLinks = [
        { key: "privacy", label: t("footer.privacy") },
        { key: "terms", label: t("footer.terms") },
        { key: "jobs", label: t("footer.jobs") },
    ];

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="border-t border-[#eee8e2] bg-[#fbfaf8]"
        >
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-12 lg:px-12">
                {/* Top row */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_auto] lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <a href="#home" className="flex items-center gap-3">
                            <LogoMark />
                            <span className="text-lg font-bold tracking-tight text-[#0F172A] sm:text-xl">СТРОЙ МОНТАЖ</span>
                        </a>
                        <p className="mt-4 max-w-sm text-sm leading-7 text-[#6f6963] sm:mt-5 sm:text-base">
                            {t("footer.description")}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-wrap gap-x-6 gap-y-3 sm:gap-x-8"
                    >
                        {footerLinks.map((link, i) => (
                            <motion.a
                                key={link.key}
                                href="#contact"
                                whileHover={{ y: -2 }}
                                className="text-sm text-[#6f6963] transition hover:text-[#F39A3D]"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-sm text-[#6f6963] lg:text-right"
                    >
                        {t("footer.copyright")}
                    </motion.p>
                </div>

                {/* Bottom divider + copyright on mobile */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-8 border-t border-[#eee8e2] pt-6 sm:hidden"
                >
                    <p className="text-center text-xs text-[#b0a89f]">{t("footer.copyright")}</p>
                </motion.div>
            </div>
        </motion.footer>
    );
}
