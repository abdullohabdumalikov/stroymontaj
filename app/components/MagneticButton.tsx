"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

export function MagneticButton({
    children,
    className,
    href,
}: {
    children: React.ReactNode;
    className: string;
    href?: string;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-50, 50], [5, -5]);
    const rotateY = useTransform(x, [-50, 50], [-5, 5]);

    function handleMouse(e: React.MouseEvent) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    }

    function handleLeave() {
        x.set(0);
        y.set(0);
    }

    const Tag = href ? "a" : "button";

    return (
        <motion.div
            style={{ rotateX, rotateY, perspective: 600 }}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
        >
            <Tag href={href} className={className} ref={ref as never}>
                {children}
            </Tag>
        </motion.div>
    );
}
