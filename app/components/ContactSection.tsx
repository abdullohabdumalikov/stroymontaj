"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { RevealSection } from "./RevealSection";
import { SectionTitle } from "./SectionTitle";
import { useTranslations } from "./useTranslations";
import { PhoneIcon, MailIcon, YoutubeIcon, TelegramIcon } from "./Icons";

type SubmitState = "idle" | "sending" | "success" | "error";

const fieldVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            delay: i * 0.1,
            ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
        },
    }),
};

const contactVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            delay: i * 0.12 + 0.3,
            ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
        },
    }),
};

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

    const formFields = [
        { name: "name", placeholder: t("contact.namePlaceholder"), type: "text", required: true },
        { name: "lastname", placeholder: t("contact.lastnamePlaceholder"), type: "text", required: false },
        { name: "phone", placeholder: t("contact.phonePlaceholder"), type: "tel", required: true },
    ];

    return (
        <RevealSection id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
            <SectionTitle prefix={t("contact.title")} accentText={t("contact.titleAccent")} />

            <div className="mt-10 grid gap-10 sm:mt-12 sm:gap-12 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
                {/* Form */}
                <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                    {formFields.map((field, i) => (
                        <motion.div
                            key={field.name}
                            custom={i}
                            variants={fieldVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <input
                                className="outline-none contact-field w-full"
                                name={field.name}
                                placeholder={field.placeholder}
                                required={field.required}
                                type={field.type as "text" | "tel"}
                            />
                        </motion.div>
                    ))}
                    <motion.div
                        custom={3}
                        variants={fieldVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <textarea
                            className="outline-none contact-field min-h-[100px] resize-none sm:min-h-28"
                            name="message"
                            placeholder={t("contact.messagePlaceholder")}
                        />
                    </motion.div>
                    <motion.div
                        custom={4}
                        variants={fieldVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.button
                            type="submit"
                            disabled={submitState === "sending"}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full rounded-full bg-[#F39A3D] px-8 py-4 font-serif text-sm font-black text-white shadow-[0_14px_35px_rgba(243,154,61,0.35)] transition hover:bg-[#de8429] disabled:cursor-not-allowed disabled:opacity-70 sm:py-5"
                        >
                            {submitState === "sending"
                                ? t("contact.sending", "YUBORILMOQDA...")
                                : t("contact.submitBtn")}{" "}
                            <span aria-hidden>-&gt;</span>
                        </motion.button>
                    </motion.div>
                    {submitState === "success" && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-2xl bg-green-50 px-5 py-4 text-sm font-semibold text-green-700"
                        >
                            {t("contact.success", "Arizangiz yuborildi. Tez orada bog'lanamiz.")}
                        </motion.p>
                    )}
                    {submitState === "error" && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-2xl bg-red-50 px-5 py-4 text-sm font-semibold text-red-700"
                        >
                            {errorMessage ||
                                t(
                                    "contact.error",
                                    "Xabar yuborilmadi. Iltimos, keyinroq qayta urinib ko'ring.",
                                )}
                        </motion.p>
                    )}
                </form>

                {/* Divider — only on lg */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hidden h-full w-px origin-top bg-[#3b342e]/60 lg:block"
                />

                {/* Contact links */}
                <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:space-y-0 lg:gap-7">
                    {contacts.map((item, i) => {
                        const Icon = item.icon;

                        return (
                            <motion.a
                                key={item.label}
                                custom={i}
                                variants={contactVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                whileHover={{ x: 6 }}
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                                className="group flex items-center gap-4 sm:gap-6"
                            >
                                <motion.span
                                    whileHover={{ rotate: 12, scale: 1.1 }}
                                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-black text-white transition group-hover:bg-[#F39A3D] sm:h-12 sm:w-12"
                                >
                                    <Icon />
                                </motion.span>
                                <span>
                                    <span className="block font-serif text-lg font-black transition group-hover:text-[#F39A3D] sm:text-xl">
                                        {item.label}
                                    </span>
                                    <span className="mt-0.5 block text-sm text-[#6f6963] transition group-hover:text-[#F39A3D] sm:mt-1">
                                        {item.value}
                                    </span>
                                </span>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </RevealSection>
    );
}
