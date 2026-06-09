"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";



const badges = ["Open to Work", "Remote-Friendly"];

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center overflow-hidden"
            aria-label="Hero"
        >
            {/* Badges */}
            <Reveal delay={0.05}>
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {badges.map((b) => (
                        <span key={b} className="px-3 py-1 text-xs font-semibold rounded-full glass animated-border" style={{ color: "var(--peach)" }}>
                            {b}
                        </span>
                    ))}
                </div>
            </Reveal>

            {/* Heading */}
            <Reveal delay={0.18}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black tracking-tight leading-[0.93] mb-6">
                    <span style={{ color: "var(--text-1)" }}>Crafting</span>{" "}
                    <span className="text-gradient ">Digital</span>
                    <br/>
                    <span style={{ color: "var(--text-1)",  }}>Experiences</span>
                </h1>
            </Reveal>

            {/* Sub */}
            <Reveal delay={0.3}>
                <p className="max-w-2xl text-lg sm:text-xl leading-relaxed mb-3" style={{ color: "var(--text-3)" }}>
                    Full-Stack Developer , turning complex ideas into elegant, performant products.
                </p>
            </Reveal>

            <Reveal delay={0.38}>
                <p className="mb-12 text-base" style={{ color: "var(--text-2)" }}>
                    Hi, I&apos;m <span className="font-bold text-gradient">Mina</span> obsessed with beautiful interfaces &amp; clean architecture.
                </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.46}>
                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    <a
                        href="#projects"
                        className="px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:brightness-110"
                        style={{ background: "var(--grad)", color: "#09060f", boxShadow: "0 8px 30px var(--glow), 0 0 0 1px rgba(87,73,100,0.3)" }}
                        data-hover
                    >
                        View My Work
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3.5 rounded-full font-bold text-sm glass glass-hover animated-border transition-all duration-300 hover:scale-105"
                        style={{ color: "var(--text-2)" }}
                        data-hover
                    >
                        Get in Touch
                    </a>
                </div>
            </Reveal>

            {/* Scroll cue */}
            <Reveal delay={1.0}>
                <motion.div
                    className="mt-10 flex flex-col items-center gap-2 text-xs"
                    style={{ color: "var(--text-3)" }}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <span>Scroll to explore</span>
                    <span className="w-px h-10" style={{ background: "linear-gradient(to bottom, var(--mauve), transparent)" }} />
                </motion.div>
            </Reveal>
        </section>
    );
    
}
