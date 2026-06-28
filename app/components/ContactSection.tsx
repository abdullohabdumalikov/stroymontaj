"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { RevealSection } from "./RevealSection";
import { SectionTitle } from "./SectionTitle";
import { useTranslations } from "./useTranslations";
import { PhoneIcon, MailIcon, YoutubeIcon, TelegramIcon } from "./Icons";

type SubmitState = "idle" | "sending" | "success" | "error";

export function ContactSection() {
    const { t } = useTranslations();
    const [submitState, setSubmitState] = useState<SubmitState>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitState("sending");
        setErrorMessage("");

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const result = await response.json().catch(() => null);
                const details =
                    result && typeof result === "object" && "details" in result
                        ? String(result.details)
                        : "";

                throw new Error(details || "Failed to send contact request");
            }

            form.reset();
            setSubmitState("success");
        } catch (error) {
            console.error(error);
            setErrorMessage(error instanceof Error ? error.message : "");
            setSubmitState("error");
        }
    }

    const contacts = [
        {
            icon: PhoneIcon,
            label: t("contact.phone"),
            value: "+998 98 809 97 37",
            href: "tel:+998988099737",
        },
        {
            icon: MailIcon,
            label: t("contact.email"),
            value: "abduazim-abdumalikov@mail.ru",
            href: "mailto:abduazim-abdumalikov@mail.ru",
        },
        {
            icon: YoutubeIcon,
            label: t("contact.youtube"),
            value: "@СТРОЙ-МОНТАЖ17",
            href: "https://www.youtube.com/@СТРОЙ-МОНТАЖ17",
        },
        {
            icon: TelegramIcon,
            label: t("contact.telegram"),
            value: "t.me/stroy_montaj",
            href: "https://t.me/stroy_montaj",
        },
    ];

    return (
        <RevealSection id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
            <SectionTitle prefix={t("contact.title")} accentText={t("contact.titleAccent")} />

            <div className="mt-10 grid gap-10 sm:mt-12 sm:gap-12 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
                {/* Form */}
                <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                    <input
                        className="outline-none contact-field"
                        name="name"
                        placeholder={t("contact.namePlaceholder")}
                        required
                    />
                    <input
                        className="outline-none contact-field"
                        name="lastname"
                        placeholder={t("contact.lastnamePlaceholder")}
                    />
                    <input
                        className="outline-none contact-field"
                        name="phone"
                        placeholder={t("contact.phonePlaceholder")}
                        required
                        type="tel"
                    />
                    <textarea
                        className="outline-none contact-field min-h-[100px] resize-none sm:min-h-28"
                        name="message"
                        placeholder={t("contact.messagePlaceholder")}
                    />
                    <button
                        type="submit"
                        disabled={submitState === "sending"}
                        className="w-full rounded-full bg-[#F39A3D] px-8 py-4 font-serif text-sm font-black text-white shadow-[0_14px_35px_rgba(243,154,61,0.35)] transition hover:-translate-y-0.5 hover:bg-[#de8429] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:py-5"
                    >
                        {submitState === "sending"
                            ? t("contact.sending", "YUBORILMOQDA...")
                            : t("contact.submitBtn")}{" "}
                        <span aria-hidden>-&gt;</span>
                    </button>
                    {submitState === "success" && (
                        <p className="rounded-2xl bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
                            {t("contact.success", "Arizangiz yuborildi. Tez orada bog'lanamiz.")}
                        </p>
                    )}
                    {submitState === "error" && (
                        <p className="rounded-2xl bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
                            {errorMessage ||
                                t(
                                    "contact.error",
                                    "Xabar yuborilmadi. Iltimos, keyinroq qayta urinib ko'ring.",
                                )}
                        </p>
                    )}
                </form>

                {/* Divider — only on lg */}
                <div className="hidden h-full w-px bg-[#3b342e]/60 lg:block" />

                {/* Contact links */}
                <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:space-y-0 lg:gap-7">
                    {contacts.map((item) => {
                        const Icon = item.icon;

                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                                className="group flex items-center gap-4 sm:gap-6"
                            >
                                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-black text-white transition group-hover:bg-[#F39A3D] sm:h-12 sm:w-12">
                                    <Icon />
                                </span>
                                <span>
                                    <span className="block font-serif text-lg font-black transition group-hover:text-[#F39A3D] sm:text-xl">
                                        {item.label}
                                    </span>
                                    <span className="mt-0.5 block text-sm text-[#6f6963] transition group-hover:text-[#F39A3D] sm:mt-1">
                                        {item.value}
                                    </span>
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </RevealSection>
    );
}
