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
    delay = 0,
}: {
    id: string;
    className: string;
    children: React.ReactNode;
    delay?: number;
}) {
    return (
        <motion.section
            id={id}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay }}
            className={className}
        >
            {children}
        </motion.section>
    );
}
