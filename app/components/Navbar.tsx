"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const links = [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Certificat", href: "#certificate" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
];

function SunIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    );
}
function MoonIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggle } = useTheme();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass shadow-[0_4px_30px_var(--glow)]" : ""
                }`}
        >
            <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between" aria-label="Main navigation">
                {/* Logo */}
                <motion.a
                    href="#hero"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl font-black tracking-tight text-gradient"
                    data-hover
                >
                    mina<span style={{ WebkitTextFillColor: "var(--text-1)" }}>.</span>dev
                </motion.a>

                {/* Desktop nav */}
                <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="hidden md:flex items-center gap-7"
                >
                    {links.map((l) => (
                        <li key={l.href}>
                            <a
                                href={l.href}
                                className="text-sm font-medium relative group transition-colors duration-200"
                                style={{ color: "var(--text-3)" }}
                                data-hover
                            >
                                <span className="group-hover:text-(--text-1) transition-colors duration-200">{l.label}</span>
                                <span
                                    className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                                    style={{ background: "var(--grad)" }}
                                />
                            </a>
                        </li>
                    ))}

                    {/* Theme toggle */}
                    <li>
                        <button
                            onClick={toggle}
                            aria-label="Toggle theme"
                            className="w-9 h-9 rounded-full glass glass-hover flex items-center justify-center transition-all duration-300 hover:scale-110"
                            style={{ color: "var(--text-2)" }}
                            data-hover
                        >
                            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </li>

                    {/* CTA */}
                    <li>
                        <a
                            href="#contact"
                            className="px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 hover:brightness-110"
                            style={{
                                background: "var(--grad)",
                                color: "#09060f",
                                boxShadow: "0 4px 20px var(--glow)",
                            }}
                            data-hover
                        >
                            Hire Me
                        </a>
                    </li>
                </motion.ul>

                {/* Mobile controls */}
                <div className="md:hidden flex items-center gap-3">
                    <button onClick={toggle} aria-label="Toggle theme" className="w-8 h-8 rounded-full glass flex items-center justify-center" style={{ color: "var(--text-2)" }}>
                        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                    </button>
                    <button
                        className="flex flex-col gap-1.5 p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span className={`w-5 h-px bg-(--rose) transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
                        <span className={`w-5 h-px bg-(--rose) transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                        <span className={`w-5 h-px bg-(--rose) transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden glass border-t"
                        style={{ borderColor: "var(--border)" }}
                    >
                        <ul className="flex flex-col px-6 py-5 gap-4">
                            {links.map((l) => (
                                <li key={l.href}>
                                    <a href={l.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium" style={{ color: "var(--text-2)" }}>
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="#contact"
                                    onClick={() => setMenuOpen(false)}
                                    className="inline-block px-5 py-2 rounded-full text-sm font-bold"
                                    style={{ background: "var(--grad)", color: "#09060f" }}
                                >
                                    Hire Me
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
