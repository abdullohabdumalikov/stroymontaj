"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

interface CountupNumberProps {
    target: number;
    suffix?: string;
    duration?: number;
}

export function CountupNumber({ target, suffix = "+", duration = 2 }: CountupNumberProps) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const display = useTransform(rounded, (value) => `${value}${suffix}`);
    const hasAnimated = useRef(false);
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasAnimated.current) {
                hasAnimated.current = true;
                animate(count, target, {
                    duration,
                    ease: [0.33, 1, 0.68, 1],
                });
                observer.disconnect();
            }
        }, { threshold: 0.3 });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [count, target, duration]);

    return (
        <motion.span
            ref={elementRef}
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        >
            {display}
        </motion.span>
    );
}
