"use client";

import { RevealSection } from "./RevealSection";
import { SectionTitle } from "./SectionTitle";
import { useTranslations } from "./useTranslations";

export function ReviewsSection() {
    const { t } = useTranslations();

    return (
        <RevealSection id="reviews" className="bg-[#fbfaf8] px-4 py-16 sm:px-8 sm:py-20">
            <div className="mx-auto max-w-4xl text-center">
                <SectionTitle prefix={t("reviews.title")} accentText={t("reviews.titleAccent")} />
                <p className="mt-5 text-base leading-7 text-[#6f6963] sm:mt-6 sm:text-lg sm:leading-8">
                    {t("reviews.text")}
                </p>
            </div>
        </RevealSection>
    );
}
