"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import featuredData from "./data/projects/featured.json";
import uiData from "./data/projects/UI.json";

/* ─── Types ─────────────────────────────────────────────── */
interface RawProject {
    project: string;
    url?: string;       // demo / live link
    repoUrl?: string;   // GitHub repo URL
    repo?: string;      // "Public" | "Private"
    descriptionTitle?: string;
    description?: string;
    images?: { key: string; url?: string }[];
    stack?: { key: string; name: string }[];
}

interface Project {
    title: string;
    description: string;
    category: "web" | "mobile" | "Other";
    tags: string[];
    demo: string | null;       // live demo URL
    repoUrl: string | null;    // GitHub repo URL
    repo: string;              // "Public" | "Private"
    images: string[];          // all image URLs for the gallery
    image: string | null;      // first image (cover)
    grad: string;
}

/* ─── Gradient palette (cycles) ─────────────────────────── */
const grads = [
    "linear-gradient(135deg,#574964,#9f8383,#ffdab3)",
    "linear-gradient(135deg,#9f8383,#c8aaaa,#ffdab3)",
    "linear-gradient(135deg,#574964,#c8aaaa)",
    "linear-gradient(135deg,#ffdab3,#9f8383)",
    "linear-gradient(135deg,#c8aaaa,#574964)",
    "linear-gradient(135deg,#574964,#ffdab3,#c8aaaa)",
    "linear-gradient(135deg,#9f8383,#574964)",
];

/* ─── Map raw JSON → unified Project ────────────────────── */
function mapProject(raw: RawProject, category: Project["category"], idx: number): Project {
    const imgs = raw.images?.map((img) => img.url).filter(Boolean) as string[] ?? [];
    return {
        title: raw.project,
        description: raw.description ?? "",
        category,
        tags: raw.stack?.map((s) => s.name) ?? [],
        demo: raw.url && raw.url.trim() !== "" ? raw.url : null,
        repoUrl: raw.repoUrl && raw.repoUrl.trim() !== "" ? raw.repoUrl : null,
        repo: raw.repo ?? "Private",
        images: imgs,
        image: imgs[0] ?? null,
        grad: grads[idx % grads.length],
    };
}

/* ─── Build the unified list ────────────────────────────── */
const allProjects: Project[] = [
    ...featuredData.map((p: RawProject, i) => {
        const category: Project["category"] = p.descriptionTitle === "mobile" ? "mobile" : "web";
        return mapProject(p, category, i);
    }),
    ...uiData.map((p: RawProject, i) => mapProject(p, "Other", featuredData.length + i)),
];

/* ─── Filter tabs ────────────────────────────────────────── */
const tabs: { label: string; value: "all" | Project["category"] }[] = [
    { label: "All", value: "all" },
    { label: " Web", value: "web" },
    { label: " Mobile", value: "mobile" },
    { label: " Other", value: "Other" },
];

/* ─── SVG Icons ──────────────────────────────────────────── */
function GithubIcon({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

function ExternalLinkIcon({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
    return (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {direction === "left"
                ? <polyline points="15 18 9 12 15 6" />
                : <polyline points="9 18 15 12 9 6" />}
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

/* ─── URL → iFrame embed ──────────────────────────────────── */
function toEmbedUrl(url: string): { src: string; isYoutube: boolean } {
    try {
        const u = new URL(url);
        // youtube.com/watch?v=ID
        if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
            return {
                src: `https://www.youtube.com/embed/${u.searchParams.get("v")}?autoplay=1&rel=0&modestbranding=1`,
                isYoutube: true,
            };
        }
        // youtu.be/ID
        if (u.hostname === "youtu.be") {
            return {
                src: `https://www.youtube.com/embed${u.pathname}?autoplay=1&rel=0&modestbranding=1`,
                isYoutube: true,
            };
        }
    } catch { /* not a URL */ }
    return { src: url, isYoutube: false };
}

/* ─── Demo Modal ─────────────────────────────────────────── */
function DemoModal({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
    const { src, isYoutube } = toEmbedUrl(url);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                key="demo-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-9999 flex items-center justify-center p-4"
                style={{ background: "rgba(9,6,15,0.92)", backdropFilter: "blur(16px)" }}
                onClick={onClose}
                aria-modal="true"
                role="dialog"
                aria-label={`Demo: ${title}`}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-20 flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110"
                    style={{ background: "rgba(9,6,15,0.7)", color: "var(--text-1)", border: "1px solid var(--border)" }}
                    aria-label="Close demo"
                >
                    <CloseIcon />
                </button>

                {/* Panel */}
                <motion.div
                    key="demo-panel"
                    initial={{ opacity: 0, scale: 0.93, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.93, y: 20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full flex flex-col rounded-2xl overflow-hidden"
                    style={{
                        maxWidth: 960,
                        border: "1px solid var(--border)",
                        boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
                        background: "#09060f",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Title bar */}
                    <div
                        className="flex items-center justify-between px-5 py-3 shrink-0"
                        style={{ borderBottom: "1px solid var(--border)" }}
                    >
                        <span className="text-sm font-bold truncate" style={{ color: "var(--text-1)" }}>
                            {title}
                        </span>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 shrink-0 ml-4"
                            style={{ background: "var(--surface)", color: "var(--peach)", border: "1px solid var(--border)" }}
                            data-hover
                            aria-label="Open in new tab"
                        >
                            <ExternalLinkIcon size={13} />
                            Ouvrir ↗
                        </a>
                    </div>

                    {/* iFrame — 16:9 pour YouTube, 75vh pour les autres */}
                    {isYoutube ? (
                        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                            <iframe
                                src={src}
                                title={title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                allowFullScreen
                                style={{
                                    position: "absolute",
                                    top: 0, left: 0,
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                }}
                            />
                        </div>
                    ) : (
                        <div style={{ height: "75vh" }}>
                            <iframe
                                src={src}
                                title={title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                allowFullScreen
                                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                            />
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}


/* ─── Action Buttons (GitHub + Demo) ────────────────────── */
function ProjectActions({
    project,
    size = "sm",
    onDemo,
}: {
    project: Project;
    size?: "sm" | "md";
    onDemo?: (url: string) => void;
}) {
    const hasDemo = project.demo && project.demo.trim() !== "";
    const hasRepo = !!project.repoUrl;

    if (!hasDemo && !hasRepo) return null;

    const base =
        size === "md"
            ? "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
            : "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95";

    return (
        <div className="flex items-center gap-3 flex-wrap">
            {/* ── GitHub ── */}
            {hasRepo && (
                <a
                    href={project.repoUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={base}
                    style={{ background: "var(--surface)", color: "var(--text-1)", border: "1px solid var(--border)" }}
                    data-hover
                    aria-label={`View ${project.title} source code on GitHub`}
                >
                    <GithubIcon size={size === "md" ? 18 : 15} />
                    Code
                </a>
            )}

            {/* ── Demo → popup ── */}
            {hasDemo && (
                <button
                    onClick={() => onDemo?.(project.demo!)}
                    className={base}
                    style={{ background: "var(--grad)", color: "#09060f" }}
                    data-hover
                    aria-label={`Watch ${project.title} demo`}
                >
                    <ExternalLinkIcon size={size === "md" ? 18 : 15} />
                    Demo
                </button>
            )}
        </div>
    );
}

/* ─── Lightbox / Popup ───────────────────────────────────── */
interface LightboxProps {
    project: Project;
    startIndex: number;
    onClose: () => void;
}

function Lightbox({ project, startIndex, onClose }: LightboxProps) {
    const images = project.images.length > 0 ? project.images : [];
    const [current, setCurrent] = useState(startIndex);
    const hasMultiple = images.length > 1;

    const prev = useCallback(() =>
        setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

    const next = useCallback(() =>
        setCurrent((c) => (c + 1) % images.length), [images.length]);

    /* keyboard navigation */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose, prev, next]);

    /* lock body scroll */
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    return (
        <AnimatePresence>
            {/* Backdrop — click to close */}
            <motion.div
                key="lightbox-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-9999 flex items-center justify-center p-4"
                style={{ background: "rgba(9,6,15,0.92)", backdropFilter: "blur(16px)" }}
                onClick={onClose}
                aria-modal="true"
                role="dialog"
                aria-label={`${project.title} image gallery`}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-20 flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110"
                    style={{ background: "rgba(9,6,15,0.7)", color: "var(--text-1)", border: "1px solid var(--border)" }}
                    aria-label="Close gallery"
                >
                    <CloseIcon />
                </button>

                {/* Image */}
                {images.length > 0 ? (
                    <div
                        className="relative flex items-center justify-center w-full h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={current}
                                src={images[current]}
                                alt={`${project.title} screenshot ${current + 1}`}
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                className="rounded-2xl object-contain shadow-2xl"
                                style={{ maxWidth: "90vw", maxHeight: "88vh" }}
                                draggable={false}
                            />
                        </AnimatePresence>

                        {/* Left arrow */}
                        {hasMultiple && (
                            <button
                                onClick={prev}
                                className="absolute left-2 sm:left-14 flex items-center justify-center w-11 h-11 rounded-full transition-all hover:scale-110"
                                style={{ background: "rgba(9,6,15,0.7)", color: "var(--text-1)", border: "1px solid var(--border)" }}
                                aria-label="Previous image"
                            >
                                <ChevronIcon direction="left" />
                            </button>
                        )}

                        {/* Right arrow */}
                        {hasMultiple && (
                            <button
                                onClick={next}
                                className="absolute right-2 sm:right-14 flex items-center justify-center w-11 h-11 rounded-full transition-all hover:scale-110"
                                style={{ background: "rgba(9,6,15,0.7)", color: "var(--text-1)", border: "1px solid var(--border)" }}
                                aria-label="Next image"
                            >
                                <ChevronIcon direction="right" />
                            </button>
                        )}

                        {/* Dot indicators */}
                        {hasMultiple && (
                            <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 flex gap-2.5">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrent(idx)}
                                        className="rounded-full transition-all duration-300"
                                        style={{
                                            width: idx === current ? 20 : 8,
                                            height: 8,
                                            background: idx === current ? "var(--peach, #ffdab3)" : "rgba(255,255,255,0.3)",
                                        }}
                                        aria-label={`Image ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Counter */}
                        {hasMultiple && (
                            <span
                                className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                                style={{ background: "rgba(9,6,15,0.65)", color: "var(--text-1)", border: "1px solid var(--border)" }}
                            >
                                {current + 1} / {images.length}
                            </span>
                        )}
                    </div>
                ) : (
                    /* No image fallback */
                    <div
                        className="rounded-2xl flex items-center justify-center"
                        style={{ width: 400, height: 280, background: project.grad }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="text-[100px] font-black opacity-10 text-white select-none">{project.title[0]}</span>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

/* ─── Card ───────────────────────────────────────────────── */
function ProjectCard({
    p, i, onOpen, onDemo,
}: {
    p: Project;
    i: number;
    onOpen: () => void;
    onDemo: (url: string) => void;
}) {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -7 }}
            className="group rounded-2xl overflow-hidden glass glass-hover animated-border flex flex-col h-full"
            style={{ boxShadow: "0 4px 24px var(--glow)" }}
        >
            {/* Cover — clickable → opens lightbox */}
            <button
                className="relative h-44 overflow-hidden shrink-0 flex items-center justify-center w-full text-left cursor-zoom-in"
                style={{
                    background: p.image
                        ? `url(${p.image}) center/cover no-repeat, ${p.grad}`
                        : p.grad,
                    border: "none",
                    padding: 0,
                }}
                onClick={onOpen}
                aria-label={`View ${p.title} gallery`}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-all duration-500" />

                {/* Initials fallback when no image */}
                {!p.image && (
                    <span className="relative text-[80px] font-black opacity-[0.13] text-white select-none z-0">
                        {p.title[0]}
                    </span>
                )}

                {/* Category badge */}
                <span
                    className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: "rgba(9,6,15,0.55)", color: "var(--peach)", border: "1px solid var(--border)" }}
                >
                    {p.category}
                </span>

                {/* Repo badge */}
                <span
                    className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                    style={{
                        background: p.repo === "Public" ? "rgba(87,73,100,0.7)" : "rgba(9,6,15,0.55)",
                        color: p.repo === "Public" ? "var(--peach)" : "var(--rose)",
                        border: "1px solid var(--border)",
                    }}
                >
                    {p.repo === "Public" ? "⊕ Open" : "⊘ Private"}
                </span>

                {/* Image count badge (when multiple images) */}
                {p.images.length > 1 && (
                    <span
                        className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1"
                        style={{ background: "rgba(9,6,15,0.65)", color: "var(--text-1)", border: "1px solid var(--border)" }}
                    >
                        <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        {p.images.length}
                    </span>
                )}

                {/* Zoom hint on hover */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold glass-sm"
                        style={{ color: "var(--peach)" }}
                    >
                        View Gallery ↗
                    </span>
                </div>
            </button>

            {/* Body */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="font-bold text-base mb-2 leading-tight" style={{ color: "var(--text-1)" }}>
                    {p.title}
                </h3>

                <p className="text-sm leading-relaxed flex-1 mb-4 line-clamp-3" style={{ color: "var(--text-3)" }}>
                    {p.description}
                </p>

                {/* Tech tags */}
                {p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tags.map((t) => (
                            <span
                                key={t}
                                className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                                style={{ background: "var(--surface)", color: "var(--rose)", border: "1px solid var(--border)" }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                )}

                {/* ── Actions: GitHub + Demo (once, below content) ── */}
                <div className="pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                    <ProjectActions project={p} size="sm" onDemo={onDemo} />
                </div>
            </div>
        </motion.article>
    );
}

/* ─── Main Section ───────────────────────────────────────── */
export default function Projects() {
    const [active, setActive] = useState<"all" | Project["category"]>("all");
    const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null);
    const [demoUrl, setDemoUrl] = useState<{ url: string; title: string } | null>(null);

    const filtered =
        active === "all" ? allProjects : allProjects.filter((p) => p.category === active);

    return (
        <>
            <section id="projects" className="section-pad" aria-label="Projects">
                <div className="container-max">
                    {/* Header */}
                    <Reveal>
                        <p className="text-center text-xs font-bold uppercase tracking-[0.32em] mb-4" style={{ color: "var(--plum)" }}>
                            Portfolio
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                            <span style={{ color: "var(--text-1)" }}>Featured </span>
                            <span className="text-gradient">Projects</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <p className="text-center max-w-xl mx-auto mb-10 text-sm" style={{ color: "var(--text-3)" }}>
                            A selection of projects across web, mobile, and design — showcasing my full range.
                        </p>
                    </Reveal>

                    {/* Filter tabs */}
                    <Reveal delay={0.2}>
                        <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="Filter projects by category">
                            {tabs.map((tab) => {
                                const isActive = active === tab.value;
                                return (
                                    <button
                                        key={tab.value}
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => setActive(tab.value)}
                                        className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                                        style={
                                            isActive
                                                ? { background: "var(--grad)", color: "#09060f", boxShadow: "0 4px 20px var(--glow)" }
                                                : { background: "var(--surface)", color: "var(--text-2)", border: "1px solid var(--border)" }
                                        }
                                        data-hover
                                    >
                                        {tab.label}
                                        <span
                                            className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                                            style={{
                                                background: isActive ? "rgba(9,6,15,0.25)" : "var(--surface)",
                                                color: isActive ? "#09060f" : "var(--text-3)",
                                            }}
                                        >
                                            {tab.value === "all"
                                                ? allProjects.length
                                                : allProjects.filter((p) => p.category === tab.value).length}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </Reveal>

                    {/* Grid */}
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((p, i) => (
                                <ProjectCard
                                    key={p.title}
                                    p={p}
                                    i={i}
                                    onOpen={() => setLightbox({ project: p, index: 0 })}
                                    onDemo={(url) => setDemoUrl({ url, title: p.title })}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Empty state */}
                    {filtered.length === 0 && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center mt-16 text-sm"
                            style={{ color: "var(--text-3)" }}
                        >
                            No projects in this category yet.
                        </motion.p>
                    )}
                </div>
            </section>

            {/* Lightbox portal */}
            <AnimatePresence>
                {lightbox && (
                    <Lightbox
                        project={lightbox.project}
                        startIndex={lightbox.index}
                        onClose={() => setLightbox(null)}
                    />
                )}
            </AnimatePresence>

            {/* Demo modal portal */}
            <AnimatePresence>
                {demoUrl && (
                    <DemoModal
                        url={demoUrl.url}
                        title={demoUrl.title}
                        onClose={() => setDemoUrl(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
