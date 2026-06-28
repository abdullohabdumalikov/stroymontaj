"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { RevealSection } from "./RevealSection";
import { SectionTitle } from "./SectionTitle";
import { useTranslations } from "./useTranslations";

import "swiper/css";

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

export function ProjectsSection() {
    const { t } = useTranslations();
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <RevealSection id="projects" className="bg-[#fbfaf8] py-16 sm:py-24">

            {/* Sarlavha + tugmalar */}
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <SectionTitle
                            prefix={t("projects.title")}
                            accentText={t("projects.titleAccent")}
                            align="left"
                        />
                        <p className="mt-3 max-w-lg text-sm leading-7 text-[#746d66] sm:mt-4 sm:text-base">
                            {t("projects.subtitle")}
                        </p>
                    </div>

                    {/* Navigatsiya */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            aria-label="Oldingi"
                            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#e4ddd6] bg-white text-[#3b342e] transition hover:border-[#F39A3D] hover:bg-[#F39A3D] hover:text-white active:scale-95"
                        >
                            <ArrowLeft size={18} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            aria-label="Keyingi"
                            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#e4ddd6] bg-white text-[#3b342e] transition hover:border-[#F39A3D] hover:bg-[#F39A3D] hover:text-white active:scale-95"
                        >
                            <ArrowRight size={18} strokeWidth={2.5} />
                        </button>

                        <span className="ml-1 font-serif text-sm font-black">
                            <span className="text-[#F39A3D]">{String(activeIndex + 1).padStart(2, "0")}</span>
                            <span className="mx-1 text-[#c4bdb5]">/</span>
                            <span className="text-[#3b342e]">{String(PROJECTS.length).padStart(2, "0")}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Slider */}
            <div className="mt-8 overflow-hidden sm:mt-10">
                <Swiper
                    modules={[Autoplay]}
                    onSwiper={(s) => { swiperRef.current = s; }}
                    onSlideChange={(s) => setActiveIndex(s.realIndex)}
                    slidesPerView={1}
                    loop={true}
                    grabCursor={true}
                    autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                >
                    {PROJECTS.map((project) => (
                        <SwiperSlide key={project.title}>
                            <div className="relative overflow-hidden rounded-2xl bg-[#201c18] sm:rounded-3xl">
                                <img
                                    src={project.src}
                                    alt={project.title}
                                    className="h-[260px] w-full object-cover sm:h-[420px] lg:h-[560px]"
                                />

                                {/* Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                                {/* Yil */}
                                <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                                    <span className="rounded-full bg-[#F39A3D] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white sm:text-xs">
                                        {project.year}
                                    </span>
                                </div>

                                {/* Matn */}
                                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
                                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F39A3D] sm:mb-2 sm:text-[11px]">
                                        {project.category}
                                    </p>
                                    <h3 className="font-serif text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
                                        {project.title}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Dot navigatsiya */}
            <div className="mt-5 flex justify-center gap-2 sm:mt-7">
                {PROJECTS.map((_, i) => (
                    <button
                        key={i}
                        aria-label={`${i + 1}-loyiha`}
                        onClick={() => swiperRef.current?.slideToLoop(i)}
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
