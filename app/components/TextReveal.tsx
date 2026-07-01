"use client";

import { motion } from "framer-motion";

export function TextReveal({
    text,
    className,
    delay = 0,
}: {
    text: string;
    className?: string;
    delay?: number;
}) {
    const words = text.split(" ");

    return (
        <motion.span
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.04, delayChildren: delay }}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                    <motion.span
                        className="inline-block"
                        variants={{
                            hidden: { y: "110%", rotateX: -40 },
                            visible: { y: "0%", rotateX: 0 },
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.33, 1, 0.68, 1],
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}
