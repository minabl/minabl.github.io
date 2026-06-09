"use client";


import Reveal from "./Reveal";
import Image from "next/image";


export default function About() {
    return (
        <section id="about" className="section-pad relative" aria-label="About me">
            {/* Top divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20" style={{ background: "linear-gradient(to bottom, transparent, var(--plum))" }} />

            <div className="container-max">
                {/* Label */}
                <Reveal>
                    <p className="text-center text-xs font-bold uppercase tracking-[0.32em] mb-4" style={{ color: "var(--plum)" }}>About Me</p>
                </Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight mb-16">
                        <span style={{ color: "var(--text-1)" }}>The person behind the </span>
                        <span className="text-gradient">code</span>
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    {/* Left — avatar + stats */}
                    <Reveal delay={0.15}>
                        <div className="flex flex-col items-center lg:items-start  ml-20  gap-8">
                            {/* Avatar */}
                            <div className="relative group">
                                <div className="absolute -inset-1 rounded-2xl blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-500" style={{ background: "var(--grad)" }} />
                                <div
                                    className="relative w-70 h-70 rounded-2xl  glass flex items-center justify-center overflow-hidden"
                                    style={{ boxShadow: "0 8px 40px var(--glow)" }}
                                >
                                   <Image
                                        src="/images/mina.png"
                                        alt="Mina - Full Stack Developer"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>


                        </div>
                    </Reveal>

                    {/* Right — bio + strengths */}
                    <div className="flex flex-col gap-5">
                        <Reveal delay={0.2}>
                            <p className="text-lg leading-relaxed" style={{ color: "var(--text-2)" }}>
                                Hi, I&apos;m <span style={{ color: "var(--text-1)" }} className="font-semibold">Mina Blilidh </span> a passionate{" "}
                                <span className="font-semibold text-gradient">Full-Stack Developer</span> &amp; building the web with purpose and precision.
                            </p>
                        </Reveal>

                        <Reveal delay={0.28}>
                            <p className="leading-relaxed" style={{ color: "var(--text-3)" }}>
                                Driven by curiosity and a commitment to continuous improvement, I approach development as an evolving craft. 
                                My passion for innovation pushes me to refine my skills, question my assumptions, and optimize how I work. 
                                I see every challenge as an opportunity to learn, iterate, and grow both technically and strategically.
                            </p>
                        </Reveal>

                        {/* CTAs */}
                        <Reveal delay={0.7}>
                            <div className="flex gap-3 mt-3">
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 hover:brightness-110"
                                    style={{ background: "var(--grad)", color: "#09060f", boxShadow: "0 4px 20px var(--glow)" }}
                                    data-hover
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    Download CV
                                </a>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold glass glass-hover animated-border transition-all duration-200 hover:scale-105"
                                    style={{ color: "var(--text-2)" }}
                                    data-hover
                                >
                                    Let&apos;s Talk
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
