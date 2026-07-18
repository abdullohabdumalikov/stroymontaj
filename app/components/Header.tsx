"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { LogoMark } from "./LogoMark";
import { useLanguage } from "./LanguageProvider";
import { useTranslations } from "./useTranslations";

const languages = [
    { code: "uz", name: "O'ZBEK", flag: "/uz.png" },
    { code: "ўз", name: "ЎЗБЕК", flag: "/уз.png" },
    { code: "ru", name: "РУССКИЙ", flag: "/ru.png" },
];

export function Header() {
    const { language, setLanguage } = useLanguage();
    const { t } = useTranslations();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const diff = latest - lastScrollY.current;
        if (latest > 80) {
            setIsScrolled(true);
            setIsHidden(diff > 10 && latest > 200);
        } else {
            setIsScrolled(false);
            setIsHidden(false);
        }
        lastScrollY.current = latest;
    });

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024) setIsMobileOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileOpen]);

    const navItems = [
        { label: t("nav.home"), href: "#home" },
        { label: t("nav.about"), href: "#about" },
        { label: t("nav.projects"), href: "#projects" },
        { label: t("nav.services"), href: "#services" },
        { label: t("nav.reviews"), href: "#reviews" },
        { label: t("nav.contact"), href: "#contact" },
    ];

    const currentLang = languages.find((l) => l.code === language) || languages[0];

    return (
        <>
            <motion.header
                animate={{ y: isHidden ? -100 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${isScrolled
                        ? "border-[#E2E8F0] bg-white/95 shadow-sm backdrop-blur-xl"
                        : "border-transparent bg-white/80 backdrop-blur-md"
                    }`}
            >
                <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-8 lg:px-12">
                    <motion.a
                        href="#home"
                        className="flex items-center gap-2.5 sm:gap-3"
                    >
                        <LogoMark />
                        <span className="text-base font-bold tracking-tight text-[#0F172A] sm:text-lg">
                            СТРОЙ МОНТАЖ
                        </span>
                    </motion.a>

                    {/* Desktop nav */}
                    <div className="hidden items-center gap-1 xl:flex">
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 + 0.2 }}
                                whileHover={{ y: -1 }}
                                className="relative rounded-lg px-3 py-2 text-xs font-semibold tracking-wide text-[#64748B] transition-colors hover:bg-[#EA580C]/5 hover:text-[#EA580C]"
                            >
                                {item.label}
                            </motion.a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Language selector */}
                        <div className="relative" ref={dropdownRef}>
                            <motion.button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                aria-label="Select language"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex h-9 items-center gap-1.5 rounded-full bg-[#0F172A] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#1E293B] sm:h-10 sm:px-4 sm:text-sm"
                            >
                                <img
                                    src={currentLang.flag}
                                    alt={currentLang.code}
                                    className="h-4 w-6 rounded object-cover sm:h-5 sm:w-7"
                                />
                                <span className="w-6 text-center sm:w-8">
                                    {currentLang.code.toUpperCase()}
                                </span>
                                <motion.span
                                    animate={{ rotate: isLangOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown size={14} />
                                </motion.span>
                            </motion.button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                                        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute right-0 top-12 w-40 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-xl"
                                    >
                                        {languages.map((lang, i) => (
                                            <motion.button
                                                key={lang.code}
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                onClick={() => {
                                                    setLanguage(lang.code as "uz" | "ўз" | "ru");
                                                    setIsLangOpen(false);
                                                }}
                                                className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors ${language === lang.code
                                                        ? "bg-[#EA580C]/10 text-[#EA580C]"
                                                        : "text-[#334155] hover:bg-[#F8FAFC] hover:text-[#EA580C]"
                                                    }`}
                                            >
                                                <img
                                                    src={lang.flag}
                                                    alt={lang.code}
                                                    className="h-5 w-7 rounded object-cover"
                                                />
                                                <span>{lang.name}</span>
                                                {language === lang.code && (
                                                    <svg className="ml-auto h-4 w-4 text-[#EA580C]" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* CTA button */}
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="hidden rounded-full bg-gradient-to-r from-[#EA580C] to-[#F97316] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#EA580C]/25 transition-all hover:shadow-xl hover:shadow-[#EA580C]/30 sm:inline-flex sm:items-center sm:gap-2"
                        >
                            Bog'lanish
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.a>

                        {/* Hamburger */}
                        <motion.button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            aria-label="Toggle navigation"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#334155] transition-colors hover:border-[#EA580C]/30 hover:text-[#EA580C] xl:hidden"
                        >
                            <AnimatePresence mode="wait">
                                {isMobileOpen ? (
                                    <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <X size={20} />
                                    </motion.span>
                                ) : (
                                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <Menu size={20} />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile nav overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 z-40 bg-[#0F172A]/40 backdrop-blur-sm xl:hidden"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-y-0 right-0 z-50 flex w-[min(320px,85vw)] flex-col bg-white shadow-2xl xl:hidden"
                        >
                            <div className="flex h-[68px] items-center justify-between border-b border-[#E2E8F0] px-6 sm:h-[72px]">
                                <div className="flex items-center gap-2">
                                    <LogoMark />
                                    <span className="text-sm font-bold text-[#0F172A]">МЕНЮ</span>
                                </div>
                                <button
                                    onClick={() => setIsMobileOpen(false)}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#334155] transition-colors hover:border-[#EA580C]/30 hover:text-[#EA580C]"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                                {navItems.map((item, i) => (
                                    <motion.a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 + 0.1 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-[#334155] transition-colors hover:bg-[#EA580C]/5 hover:text-[#EA580C]"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#EA580C]" />
                                        {item.label}
                                    </motion.a>
                                ))}
                            </nav>

                            <div className="border-t border-[#E2E8F0] p-6">
                                <motion.a
                                    href="#contact"
                                    onClick={() => setIsMobileOpen(false)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#EA580C] to-[#F97316] py-4 text-sm font-bold text-white shadow-lg shadow-[#EA580C]/25"
                                >
                                    {t("hero.cta1")}
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
