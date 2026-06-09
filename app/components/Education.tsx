"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import educationData from "./data/education.json";

const education = educationData;



export default function Education() {
    return (
        <section id="education" className="section-pad" aria-label="Education">
            <div className="container-max">
                <Reveal><p className="text-center text-xs font-bold uppercase tracking-[0.32em] mb-4" style={{ color: "var(--plum)" }}>My Journey</p></Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        <span style={{ color: "var(--text-1)" }}>Education</span>
                    </h2>
                </Reveal>
                {/* Education Timeline Section */}
                <Reveal delay={0.15}>
                    <h3 className="text-2xl font-bold mb-10" style={{ color: "var(--text-1)" }}></h3>
                </Reveal>

                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical line */}
                    <div
                        className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px"
                        style={{ background: "linear-gradient(to bottom, transparent, var(--plum) 15%, var(--mauve) 85%, transparent)" }}
                    />

                    <div className="flex flex-col gap-10">
                        {education.map((item, i) => (
                            <Reveal key={item.role} delay={0.1 + i * 0.15}>
                                <motion.div
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                                    className={`relative flex items-start md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                                >
                                    {/* Card */}
                                    <div className={`pl-14 md:pl-0 flex-1 ${i % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}>
                                        <motion.div
                                            whileHover={{ y: -3 }}
                                            transition={{ duration: 0.25 }}
                                            className="p-5 rounded-2xl glass glass-hover animated-border"
                                            style={{ boxShadow: "0 4px 24px var(--glow)" }}
                                        >
                                            <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                                                <div>
                                                    <h3 className="font-bold" style={{ color: "var(--text-1)" }}>{item.role}</h3>
                                                    <p className="text-sm font-semibold text-gradient">{item.company}</p>
                                                </div>
                                                <span
                                                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                                                    style={{
                                                        background: "rgba(207,171,141,0.15)",
                                                        color: "var(--peach)",
                                                    }}
                                                >
                                                    🎓 Education
                                                </span>
                                            </div>
                                            <p className="text-xs mb-3" style={{ color: "var(--mauve)" }}>{item.period} · {item.location}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.tags.map((t) => (
                                                    <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: "var(--surface)", color: "var(--rose)", border: "1px solid var(--border)" }}>{t}</span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Timeline dot */}
                                    <div
                                        className="absolute left-4.5 md:left-1/2 md:-translate-x-1/2 top-5 w-4 h-4 rounded-full border-2 z-10 flex items-center justify-center"
                                        style={{ borderColor: "var(--plum)", background: "var(--bg)", boxShadow: "0 0 14px var(--glow)" }}
                                    >
                                        <div className="w-2 h-2 rounded-full" style={{ background: "var(--grad)" }} />
                                    </div>

                                    <div className="hidden md:block flex-1" />
                                </motion.div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
