"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024) setIsMobileOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Prevent body scroll when mobile menu open
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
            <header className="fixed inset-x-0 top-0 z-50 border-b border-[#eee8e2] bg-white/95 shadow-[0_6px_28px_rgba(36,31,26,0.07)] backdrop-blur-xl">
                <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-8 lg:px-12">

                    {/* Logo */}
                    <a href="#home" className="flex items-center gap-2.5 sm:gap-3">
                        <LogoMark />
                        <span className="font-serif text-base font-black sm:text-lg">
                            СТРОЙ МОНТАЖ
                        </span>
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden items-center gap-6 xl:flex">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-[11px] font-black tracking-[0.14em] text-[#2e2924] uppercase transition hover:text-[#F39A3D]"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Right side: lang + hamburger */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Language selector */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                aria-label="Select language"
                                className="flex h-9 items-center gap-1.5 rounded-full bg-[#211c17] px-3 text-xs font-bold text-white transition hover:bg-[#3b342e] sm:h-10 sm:px-4 sm:text-sm"
                            >
                                <img
                                    src={currentLang.flag}
                                    alt={currentLang.code}
                                    className="h-4 w-6 rounded object-cover sm:h-5 sm:w-7"
                                />
                                <span className="w-6 text-center sm:w-8">
                                    {currentLang.code.toUpperCase()}
                                </span>
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -6 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -6 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 top-12 w-40 overflow-hidden rounded-2xl border border-[#eee8e2] bg-white shadow-xl"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code as "uz" | "ўз" | "ru");
                                                    setIsLangOpen(false);
                                                }}
                                                className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-bold transition ${
                                                    language === lang.code
                                                        ? "bg-[#F39A3D]/15 text-[#F39A3D]"
                                                        : "text-[#2e2924] hover:bg-[#fbfaf8] hover:text-[#F39A3D]"
                                                }`}
                                            >
                                                <img
                                                    src={lang.flag}
                                                    alt={lang.code}
                                                    className="h-5 w-7 rounded object-cover"
                                                />
                                                <span>{lang.name}</span>
                                                {language === lang.code && (
                                                    <span className="ml-auto text-[#F39A3D]">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Hamburger — visible below xl */}
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            aria-label="Toggle navigation"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#eee8e2] bg-white text-[#2e2924] transition hover:border-[#F39A3D] hover:text-[#F39A3D] xl:hidden"
                        >
                            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile nav overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm xl:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 320, damping: 32 }}
                            className="fixed inset-y-0 right-0 z-50 flex w-[min(320px,90vw)] flex-col bg-white shadow-2xl xl:hidden"
                        >
                            {/* Drawer header */}
                            <div className="flex h-[68px] items-center justify-between border-b border-[#eee8e2] px-6 sm:h-[72px]">
                                <span className="font-serif text-base font-black">Menyu</span>
                                <button
                                    onClick={() => setIsMobileOpen(false)}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#eee8e2] text-[#2e2924] transition hover:border-[#F39A3D] hover:text-[#F39A3D]"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Nav links */}
                            <nav className="flex flex-col gap-1 overflow-y-auto p-4">
                                {navItems.map((item, i) => (
                                    <motion.a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 + 0.1 }}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-[#2e2924] transition hover:bg-[#F39A3D]/10 hover:text-[#F39A3D]"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#F39A3D]" />
                                        {item.label}
                                    </motion.a>
                                ))}
                            </nav>

                            {/* CTA at bottom */}
                            <div className="mt-auto border-t border-[#eee8e2] p-6">
                                <a
                                    href="#contact"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="block w-full rounded-full bg-[#F39A3D] py-4 text-center font-serif text-sm font-black text-white shadow-[0_10px_25px_rgba(243,154,61,0.35)] transition hover:-translate-y-0.5 hover:bg-[#de8429]"
                                >
                                    {t("hero.cta1")}
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
