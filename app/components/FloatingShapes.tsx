"use client";

import { motion } from "framer-motion";

const shapes = [
    { size: 80, x: "10%", y: "20%", delay: 0, duration: 18, color: "rgba(243,154,61,0.06)" },
    { size: 120, x: "85%", y: "15%", delay: 2, duration: 22, color: "rgba(243,154,61,0.04)" },
    { size: 60, x: "70%", y: "70%", delay: 4, duration: 16, color: "rgba(243,154,61,0.05)" },
    { size: 100, x: "20%", y: "80%", delay: 1, duration: 20, color: "rgba(243,154,61,0.04)" },
    { size: 50, x: "50%", y: "40%", delay: 3, duration: 24, color: "rgba(243,154,61,0.03)" },
];

export function FloatingShapes() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {shapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: shape.size,
                        height: shape.size,
                        left: shape.x,
                        top: shape.y,
                        background: shape.color,
                        filter: "blur(1px)",
                    }}
                    animate={{
                        y: [0, -30, 0, 20, 0],
                        x: [0, 15, -10, 5, 0],
                        scale: [1, 1.1, 0.95, 1.05, 1],
                    }}
                    transition={{
                        duration: shape.duration,
                        delay: shape.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
