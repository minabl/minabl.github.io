"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const timeline = [
    { 
        role: "Master’s Degree in Web and Multimedia Services", 
        company: "Higher Institute of Computer Science and Communication Technologies (ISITCOM)", 
        period: "2023 — 2025", 
        location: "Hammam Sousse, Tunisia", 
        type: "education", 
        tags: ["Software Engineering", "HCI", "Machine Learning"], 
        desc: "Professional Master’s degree focused on Web Technologies and Multimedia."
    },
    { 
        role: "National Bachelor’s Degree in Computer Science", 
        company: "Higher Institute of Computer Science and Communication Technologies (ISITCOM)", 
        period: "2021 — 2023", 
        location: "Hammam Sousse, Tunisia", 
        type: "education", 
        tags: ["Algorithms", "Web Development", "Databases"], 
        desc: "Bachelor’s degree in Computer Science with strong foundation in software development."
    },

    // ✅ PFE MARS Research Lab
    { 
        role: "AI Research Intern – Final Year Project", 
        company: "MARS Research Lab", 
        period: "Jan 2025 — Jun 2025", 
        location: "Hammam Sousse, Tunisia", 
        type: "experience", 
        tags: ["Python", "TensorFlow", "Machine Learning", "Data Preprocessing"], 
        desc: "Designed and implemented an AI-based recommendation system. Performed data preprocessing, feature engineering, and developed Machine Learning models using TensorFlow."
    },

    // ✅ Projet Tunisie Technologie
    { 
        role: "Full-Stack Developer – Academic Project", 
        company: "Tunisie Technologie", 
        period: "Feb 2023 — May 2023", 
        location: "Sahloul, Tunisia", 
        type: "experience", 
        tags: ["React.js", "Redux Toolkit", "Leaflet", "Laravel", "MySQL"], 
        desc: "Designed and developed a home services management platform. Implemented booking system, provider management, and geolocation-based search using Leaflet."
    },

    // Stage LAB-IT
    { 
        role: "Web Developer Intern (WordPress)", 
        company: "LAB-IT", 
        period: "Jun 2022 — Aug 2022", 
        location: "Sousse, Tunisia", 
        type: "experience", 
        tags: ["WordPress", "PHP", "Theme Customization"], 
        desc: "Developed a car rental website and customized WordPress themes and plugins."
    }
];

export default function Experience() {
    return (
        <section id="experience" className="section-pad" aria-label="Experience">
            <div className="container-max">
                <Reveal><p className="text-center text-xs font-bold uppercase tracking-[0.32em] mb-4" style={{ color: "var(--plum)" }}>My Journey</p></Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        <span style={{ color: "var(--text-1)" }}>Experience &amp; </span><span className="text-gradient">Education</span>
                    </h2>
                </Reveal>
                <Reveal delay={0.15}>
                    <p className="text-center max-w-xl mx-auto mb-16 text-sm" style={{ color: "var(--text-3)" }}>
                        5+ years of building products people love — here&apos;s how I got here.
                    </p>
                </Reveal>

                {/* Timeline */}
                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical line */}
                    <div
                        className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px"
                        style={{ background: "linear-gradient(to bottom, transparent, var(--plum) 15%, var(--mauve) 85%, transparent)" }}
                    />

                    <div className="flex flex-col gap-10">
                        {timeline.map((item, i) => (
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
                                                        background: item.type === "education" ? "rgba(255,218,179,0.15)" : "rgba(87,73,100,0.2)",
                                                        color: item.type === "education" ? "var(--peach)" : "var(--rose)",
                                                    }}
                                                >
                                                    {item.type === "education" ? "🎓 Education" : "💼 Work"}
                                                </span>
                                            </div>
                                            <p className="text-xs mb-3" style={{ color: "var(--mauve)" }}>{item.period} · {item.location}</p>
                                            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-3)" }}></p>
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
