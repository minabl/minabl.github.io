"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import workExperienceData from "./data/workExperience.json";

const workExperience = workExperienceData;

export default function Experience() {
    return (
        <section id="experience" className="section-pad" aria-label="Experience">
            <div className="container-max">
                <Reveal><p className="text-center text-xs font-bold uppercase tracking-[0.32em] mb-4" style={{ color: "var(--plum)" }}>My Journey</p></Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        <span style={{ color: "var(--text-1)" }}>Experience </span>
                    </h2>
                </Reveal>

                <Reveal delay={0.15}>
                    <h3 className="text-2xl font-bold mb-10" style={{ color: "var(--text-1)" }}>Experience</h3>
                </Reveal>

                <div className="space-y-6 mb-20">
                    {workExperience.map((item, i) => (
                        <Reveal key={item.role} delay={0.2 + i * 0.1}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="p-6 md:p-8 rounded-2xl glass glass-hover animated-border"
                                style={{ boxShadow: "0 4px 24px var(--glow)" }}
                            >
                                <div className="flex justify-between items-start flex-wrap gap-3 mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold" style={{ color: "var(--text-1)" }}>{item.role} — <span className="text-gradient">{item.company}</span></h3>
                                    </div>
                                </div>
                                
                                <p className="text-sm mb-4" style={{ color: "var(--mauve)" }}>{item.period} • {item.location}</p>

                                <ul className="space-y-2 mb-4">
                                    {item.bullets.map((bullet, idx) => (
                                        <li key={idx} className="text-sm flex gap-3" style={{ color: "var(--text-3)" }}>
                                            <span className="text-lg leading-none" style={{ color: "var(--plum)" }}>•</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-xs font-semibold mb-3" style={{ color: "var(--mauve)" }}>tech:</p>
                                <div className="flex flex-wrap gap-2">
                                    {item.tech.map((t) => (
                                        <span key={t} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "var(--surface)", color: "var(--peach)", border: "1px solid var(--border)" }}>
                                            {t}
                                        </span>
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
