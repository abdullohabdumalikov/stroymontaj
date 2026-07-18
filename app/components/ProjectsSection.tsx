"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { RevealSection } from "./RevealSection";
import { SectionTitle } from "./SectionTitle";
import { useTranslations } from "./useTranslations";

import "swiper/css";
import "swiper/css/effect-fade";

const PROJECTS = [
    {
        title: "Zamonaviy Turar-Joy Kompleksi",
        category: "Ko'p qavatli qurilish",
        year: "2023",
        src: "/project_tower.jpg",
    },
    {
        title: "Sanoat Obyekti",
        category: "Sanoat qurilishi",
        year: "2022",
        src: "/project_industrial.jpg",
    },
    {
        title: "Qurilish Loyihasi",
        category: "Fuqarolik qurilishi",
        year: "2024",
        src: "/hero_construction.jpg",
    },
];

function ProjectSlide({ project }: { project: (typeof PROJECTS)[number] }) {
    const ref = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { scrollYProgress } = useScroll({
        target: mounted ? ref : undefined,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

    return (
        <div ref={ref} className="relative overflow-hidden rounded-2xl bg-[#201c18] sm:rounded-3xl">
            <motion.div style={{ y, scale }} className="h-[260px] sm:h-[420px] lg:h-[560px]">
                <img
                    src={project.src}
                    alt={project.title}
                    className="h-full w-full object-cover"
                />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute left-5 top-5 sm:left-7 sm:top-7"
            >
                <span className="rounded-full bg-[#F39A3D] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white sm:text-xs">
                    {project.year}
                </span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8"
            >
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F39A3D] sm:mb-2 sm:text-[11px]">
                    {project.category}
                </p>
                <h3 className="font-serif text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
                    {project.title}
                </h3>
            </motion.div>
        </div>
    );
}

export function ProjectsSection() {
    const { t } = useTranslations();
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <RevealSection id="projects" className="bg-[#fbfaf8] py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <SectionTitle
                            prefix={t("projects.title")}
                            accentText={t("projects.titleAccent")}
                            align="left"
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-3 max-w-lg text-sm leading-7 text-[#746d66] sm:mt-4 sm:text-base"
                        >
                            {t("projects.subtitle")}
                        </motion.p>
                    </div>

                    <div className="flex items-center gap-3">
                        <motion.button
                            onClick={() => swiperRef.current?.slidePrev()}
                            aria-label="Oldingi"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#e4ddd6] bg-white text-[#3b342e] transition hover:border-[#F39A3D] hover:bg-[#F39A3D] hover:text-white"
                        >
                            <ArrowLeft size={18} strokeWidth={2.5} />
                        </motion.button>
                        <motion.button
                            onClick={() => swiperRef.current?.slideNext()}
                            aria-label="Keyingi"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#e4ddd6] bg-white text-[#3b342e] transition hover:border-[#F39A3D] hover:bg-[#F39A3D] hover:text-white"
                        >
                            <ArrowRight size={18} strokeWidth={2.5} />
                        </motion.button>

                        <span className="ml-1 font-serif text-sm font-black">
                            <span className="text-[#F39A3D]">{String(activeIndex + 1).padStart(2, "0")}</span>
                            <span className="mx-1 text-[#c4bdb5]">/</span>
                            <span className="text-[#3b342e]">{String(PROJECTS.length).padStart(2, "0")}</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-8 overflow-hidden sm:mt-10">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    onSwiper={(s) => { swiperRef.current = s; }}
                    onSlideChange={(s) => setActiveIndex(s.realIndex)}
                    slidesPerView={1}
                    loop={true}
                    grabCursor={true}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                >
                    {PROJECTS.map((project) => (
                        <SwiperSlide key={project.title}>
                            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
                                <ProjectSlide project={project} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="mt-5 flex justify-center gap-2 sm:mt-7">
                {PROJECTS.map((_, i) => (
                    <motion.button
                        key={i}
                        aria-label={`${i + 1}-loyiha`}
                        onClick={() => swiperRef.current?.slideToLoop(i)}
                        whileHover={{ scale: 1.2 }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            activeIndex === i
                                ? "w-10 bg-[#F39A3D]"
                                : "w-2 bg-[#d8d0c7] hover:bg-[#F39A3D]/60"
                        }`}
                    />
                ))}
            </div>
        </RevealSection>
    );
}
