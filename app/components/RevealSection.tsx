"use client";

import { motion } from "framer-motion";

const reveal = {
    hidden: { opacity: 0, y: 44 },
    visible: { opacity: 1, y: 0 },
};

export function RevealSection({
    id,
    className,
    children,
}: {
    id: string;
    className: string;
    children: React.ReactNode;
}) {
    return (
        <motion.section
            id={id}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.section>
    );
}
