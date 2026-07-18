"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function ImageReveal({
    src,
    alt,
    className,
}: {
    src: string;
    alt: string;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { scrollYProgress } = useScroll({
        target: mounted ? ref : undefined,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div style={{ y, scale }} className="h-full w-full">
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                />
            </motion.div>
        </div>
    );
}
