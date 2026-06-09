"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -200, y: -200 });
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        const over = (e: MouseEvent) => {
            const t = e.target as Element;
            setHovering(!!(t.closest("a,button,[data-hover]")));
        };
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", over);
        return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
    }, []);

    return (
        <>
            {/* Ambient glow that follows cursor */}
            <motion.div
                className="fixed pointer-events-none z-9998"
                animate={{ x: pos.x - 240, y: pos.y - 240 }}
                transition={{ type: "spring", stiffness: 60, damping: 18 }}
            >
                <div
                    className="w-120 h-120 rounded-full blur-[100px]"
                    style={{ background: "radial-gradient(circle, rgba(255,218,179,0.07), rgba(87,73,100,0.05), transparent 70%)" }}
                />
            </motion.div>

            {/* Dot */}
            <motion.div
                className="fixed pointer-events-none z-9999 mix-blend-screen"
                animate={{ x: pos.x - 5, y: pos.y - 5, scale: hovering ? 2.8 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
                <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                        background: "radial-gradient(circle, #ffdab3, #9f8383)",
                        boxShadow: "0 0 10px #ffdab3, 0 0 20px rgba(255,218,179,0.4)",
                    }}
                />
            </motion.div>
        </>
    );
}
