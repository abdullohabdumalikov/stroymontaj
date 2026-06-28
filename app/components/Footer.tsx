"use client";

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
        <footer className="border-t border-[#eee8e2] bg-[#fbfaf8]">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-12 lg:px-12">
                {/* Top row */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_auto] lg:items-center">
                    <div>
                        <a href="#home" className="flex items-center gap-3">
                            <LogoMark />
                            <span className="font-serif text-lg font-black sm:text-xl">СТРОЙ МОНТАЖ</span>
                        </a>
                        <p className="mt-4 max-w-sm text-sm leading-7 text-[#6f6963] sm:mt-5 sm:text-base">
                            {t("footer.description")}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-3 sm:gap-x-8">
                        {footerLinks.map((link) => (
                            <a
                                key={link.key}
                                href="#contact"
                                className="text-sm text-[#6f6963] transition hover:text-[#F39A3D]"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <p className="text-sm text-[#6f6963] lg:text-right">{t("footer.copyright")}</p>
                </div>

                {/* Bottom divider + copyright on mobile */}
                <div className="mt-8 border-t border-[#eee8e2] pt-6 sm:hidden">
                    <p className="text-center text-xs text-[#b0a89f]">{t("footer.copyright")}</p>
                </div>
            </div>
        </footer>
    );
}
