"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import certificatesData from "./data/projects/certificates.json";

export default function Certificates() {
    return (
        <section id="certificates" className="section-pad relative" aria-label="Certificates">
            {/* Top divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20" style={{ background: "linear-gradient(to bottom, transparent, var(--plum))" }} />

            <div className="container-max">
                {/* Label */}
                <Reveal>
                    <p className="text-center text-xs font-bold uppercase tracking-[0.32em] mb-4" style={{ color: "var(--plum)" }}>Credentials</p>
                </Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        <span style={{ color: "var(--text-1)" }}>Certifications &amp; </span>
                        <span className="text-gradient">Awards</span>
                    </h2>
                </Reveal>
                <Reveal delay={0.15}>
                    <p className="text-center max-w-xl mx-auto mb-16 text-sm" style={{ color: "var(--text-3)" }}>
                        Professional certifications and industry-recognized credentials.
                    </p>
                </Reveal>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {certificatesData.map((cert, i) => (
                        <Reveal key={cert.title} delay={0.1 + i * 0.1}>
                            <motion.a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -6 }}
                                className="p-6 rounded-2xl glass glass-hover animated-border group transition-all duration-300 cursor-pointer"
                                style={{ boxShadow: "0 4px 24px var(--glow)" }}
                            >
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                        {cert.icon}
                                    </span>
                                    <svg
                                        className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        style={{ color: "var(--plum)" }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>

                                <h3 className="font-bold mb-2" style={{ color: "var(--text-1)" }}>
                                    {cert.title}
                                </h3>

                                <p className="text-sm font-semibold text-gradient mb-3">
                                    {cert.issuer}
                                </p>

                                <p className="text-xs mb-4" style={{ color: "var(--text-3)" }}>
                                    {cert.date} · <span style={{ color: "var(--mauve)" }}>{cert.credential}</span>
                                </p>

                                <div
                                    className="inline-block px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
                                    style={{
                                        background: "rgba(200, 150, 255, 0.1)",
                                        color: "var(--plum)",
                                        border: "1px solid rgba(200, 150, 255, 0.2)",
                                    }}
                                >
                                    View Credential →
                                </div>
                            </motion.a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
