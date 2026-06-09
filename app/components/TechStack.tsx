"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import Image from "next/image";
import categories from "./data/projects/skills.json";


export default function TechStack() {
    return (
        <section id="stack" className="section-pad" aria-label="Tech stack">
            <div className="container-max">
                <Reveal>
                    <p className="text-center text-xs font-bold uppercase tracking-[0.32em] mb-4" style={{ color: "var(--plum)" }}>
                        Tech Stack
                    </p>
                </Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        <span style={{ color: "var(--text-1)" }}>Tools of the </span>
                        <span className="text-gradient">Trade</span>
                    </h2>
                </Reveal>
                <Reveal delay={0.15}>
                    <p className="text-center max-w-xl mx-auto mb-16 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                        A curated set of technologies I use to craft high-performance, beautiful digital products.
                    </p>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {categories.map((cat, ci) => (
                        <Reveal key={cat.label} delay={0.15 + ci * 0.1}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                                className="p-6 rounded-2xl glass glass-hover animated-border h-full flex flex-col gap-5"
                                style={{ boxShadow: "0 4px 24px var(--glow)" }}
                            >
                                <div className="flex items-center gap-3">
                                    <h3 className="font-bold text-xs uppercase tracking-wider" style={{ color: "var(--text-2)" }}>
                                        {cat.label}
                                    </h3>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {cat.skills.map((skill, si) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, x: -12 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 + ci * 0.08 + si * 0.06, duration: 0.4 }}
                                            className="flex items-center gap-3"
                                        >
                                            <div
                                                className="w-7 h-7 flex items-center justify-center rounded-lg shrink-0"
                                                style={{ background: "rgba(255,255,255,0.06)" }}
                                            >
                                                <Image
                                                    src={skill.icon}
                                                    alt={skill.name}
                                                    width={18}
                                                    height={18}
                                                    unoptimized
                                                />
                                            </div>
                                            <span className="text-sm font-medium" style={{ color: "var(--text-1)" }}>
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
