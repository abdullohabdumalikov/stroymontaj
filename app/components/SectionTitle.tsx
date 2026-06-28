"use client";

import { motion } from "framer-motion";

export function SectionTitle({
    prefix,
    accentText,
    align = "center",
}: {
    prefix: string;
    accentText: string;
    align?: "left" | "center";
}) {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const charVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <h2
            className={`font-serif font-black leading-tight ${align === "center" ? "text-center" : "text-left"}`}
            style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}
        >
            <motion.span
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="inline-block"
            >
                {prefix.split("").map((char, i) => (
                    <motion.span key={i} variants={charVariants}>
                        {char}
                    </motion.span>
                ))}
            </motion.span>
            {" "}
            <motion.span
                className="text-[#F39A3D] inline-block"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                {accentText.split("").map((char, i) => (
                    <motion.span key={i} variants={charVariants}>
                        {char}
                    </motion.span>
                ))}
            </motion.span>
        </h2>
    );
}
