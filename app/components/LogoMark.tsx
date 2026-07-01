"use client";

import { motion } from "framer-motion";

export function LogoMark() {
    return (
        <motion.img
            src="/logo.png"
            alt="СТРОЙ МОНТАЖ"
            className="h-17 w-auto"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
        />
    );
}
