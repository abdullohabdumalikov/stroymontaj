import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "./components/LanguageProvider";
import "./globals.css";

const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "СТРОЙ МОНТАЖ | Строим будущее",
    description:
        "Проектирование, строительство и монтаж конструкций для надежных современных объектов.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ru"
            className={`${dmSans.variable} ${playfair.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                <LanguageProvider>{children}</LanguageProvider>
            </body>
        </html>
    );
}
