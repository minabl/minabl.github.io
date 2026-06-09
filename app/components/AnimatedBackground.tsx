"use client";

import { motion } from "framer-motion";

const blobs = [
    { style: { background: "radial-gradient(circle, rgba(87,73,100,0.4) 0%, transparent 70%)" }, className: "absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full blur-[110px]", anim: { x: [0, 80, -40, 0], y: [0, -60, 80, 0], scale: [1, 1.15, 0.9, 1] }, dur: 20 },
    { style: { background: "radial-gradient(circle, rgba(255,218,179,0.22) 0%, transparent 70%)" }, className: "absolute top-1/4 -right-48 w-[650px] h-[650px] rounded-full blur-[100px]", anim: { x: [0, -70, 40, 0], y: [0, 80, -50, 0], scale: [1, 0.9, 1.1, 1] }, dur: 26 },
    { style: { background: "radial-gradient(circle, rgba(159,131,131,0.22) 0%, transparent 70%)" }, className: "absolute bottom-1/4 left-1/4 w-[550px] h-[550px] rounded-full blur-[90px]", anim: { x: [0, 50, -60, 0], y: [0, -60, 40, 0], scale: [1, 1.1, 0.95, 1] }, dur: 30 },
    { style: { background: "radial-gradient(circle, rgba(200,170,170,0.13) 0%, transparent 70%)" }, className: "absolute -bottom-20 right-1/4 w-[450px] h-[450px] rounded-full blur-[80px]", anim: { x: [0, -40, 70, 0], y: [0, 60, -50, 0], scale: [1, 1.2, 0.9, 1] }, dur: 23 },
];

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.028]"
                style={{
                    backgroundImage: "linear-gradient(rgba(200,170,170,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(200,170,170,0.4) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                }}
            />
            {/* Top radial */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(87,73,100,0.18), transparent)" }} />
            {/* Blobs */}
            {blobs.map((b, i) => (
                <motion.div
                    key={i}
                    className={b.className}
                    style={b.style}
                    animate={b.anim}
                    transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}
        </div>
    );
}
