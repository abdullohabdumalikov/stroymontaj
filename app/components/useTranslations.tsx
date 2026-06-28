"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type Translation = Record<string, unknown>;

export function useTranslations() {
    const { language } = useLanguage();
    const [translations, setTranslations] = useState<Translation>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadTranslations() {
            try {
                setIsLoading(true);
                const response = await fetch(`/locales/${language}/common.json`);
                const data = await response.json();
                setTranslations(data);
            } catch (error) {
                console.error("Failed to load translations:", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadTranslations();
    }, [language]);

    return {
        t: (key: string, defaultValue?: string) => {
            const keys = key.split(".");
            let value: unknown = translations;

            for (const k of keys) {
                if (!value || typeof value !== "object") {
                    value = undefined;
                    break;
                }

                value = (value as Translation)[k];
            }

            if (typeof value === "string") {
                return value;
            }

            if (typeof value === "number") {
                return String(value);
            }

            return defaultValue || key;
        },
        isLoading,
        language,
    };
}
