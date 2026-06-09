"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";
import certificationsData from "./data/certifications.json";

const certifications = certificationsData;
export default function Certificate() {
    const [selectedCertificationFilter, setSelectedCertificationFilter] = useState<string | null>(null);
    const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);

    const certificationCategories = ["Gouvernance", "AI & Machine Learning", "DevOps"];

    const filteredCertifications = selectedCertificationFilter
        ? certifications.filter(cert => cert.category === selectedCertificationFilter)
        : certifications;

    return (
        <section id="certificate" className="section-pad" aria-label="Certificate">
            <div className="container-max">
                <Reveal><p className="text-center text-xs font-bold uppercase tracking-[0.32em] mb-4" style={{ color: "var(--plum)" }}>Get Involved</p></Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        <span style={{ color: "var(--text-1)" }}>Certifications </span>
                    </h2>
                </Reveal>
                <Reveal delay={0.15}>
                    <p className="text-center max-w-xl mx-auto mb-16 text-sm" style={{ color: "var(--text-3)" }}>
                        
                    </p>
                </Reveal>

                {/* Certifications Section */}
                <Reveal delay={0.2}>
                    <h3 className="text-2xl font-bold mb-10" style={{ color: "var(--text-1)" }}></h3>
                </Reveal>

                {/* Certifications Filter */}
                <Reveal delay={0.25}>
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        <button
                            onClick={() => setSelectedCertificationFilter(null)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                selectedCertificationFilter === null
                                    ?  { background: "var(--grad)", color: "white" }
                                    : "bg-surface text-text-3 hover:opacity-80 border border-border"
                            }`}
                            style={selectedCertificationFilter === null ?  { background: "var(--grad)", color: "white" } : { background: "var(--surface)", color: "var(--text-3)", border: "1px solid var(--border)" }}
                        >
                            All
                        </button>
                        {certificationCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCertificationFilter(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    selectedCertificationFilter === category
                                        ? "text-white"
                                        : "hover:opacity-80"
                                }`}
                                style={
                                    selectedCertificationFilter === category
                                        ? { background: "var(--grad)", color: "white" }
                                        : { background: "var(--surface)", color: "var(--text-3)", border: "1px solid var(--border)" }
                                }
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredCertifications.map((cert, i) => (
                        <Reveal key={cert.title} delay={0.3 + i * 0.1}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="p-6 rounded-2xl glass glass-hover animated-border overflow-hidden group"
                                style={{ boxShadow: "0 4px 24px var(--glow)" }}
                            >
                                {/* Certificate Image Background */}
                                {cert.image && (
                                    <div className="absolute inset-0 opacity-8 group-hover:opacity-20 transition-opacity duration-300">
                                        <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <div className="relative z-10">
                                    <div className="flex items-start gap-3 mb-3">
                                        
                                        <div>
                                            <h3 className="font-bold" style={{ color: "var(--text-1)" }}>{cert.title}</h3>
                                            {cert.titleFr && (
                                                <p className="text-xs" style={{ color: "var(--text-3)" }}>{cert.titleFr}</p>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-sm font-semibold" style={{ color: "var(--peach)" }}>{cert.issuer}</p>
                                    <p className="text-xs" style={{ color: "var(--mauve)" }}>📅 {cert.date}</p>

                                    {cert.bullets && (
                                        <ul className="space-y-2 mt-4">
                                            {cert.bullets.map((bullet, idx) => (
                                                <li key={idx} className="text-xs flex gap-2" style={{ color: "var(--text-3)" }}>
                                                    <span style={{ color: "var(--peach)" }}>•</span>
                                                    <span style={{ color: "var(--text-1)" }}>{bullet} </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {cert.image && (
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <button
                                                onClick={() => setSelectedCertImage(cert.image)}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                                                style={{ background: "var(--surface)", color: "var(--peach)", border: "1px solid var(--border)" }}
                                            >
                                                 View
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Certificate Modal */}
            {selectedCertImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedCertImage(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden"
                    >
                        <img
                            src={selectedCertImage}
                            alt="Certificate"
                            className="w-full h-full object-contain"
                        />
                        <button
                            onClick={() => setSelectedCertImage(null)}
                            className="absolute top-4 right-4 p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-all text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}
