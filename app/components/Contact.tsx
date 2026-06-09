"use client";

import Reveal from "./Reveal";

const socials = [
    {
        label: "GitHub", href: "https://github.com/minabl", icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
        )
    },
    {
        label: "LinkedIn", href: "https://www.linkedin.com/in/mina-blilidh-06884927b/", icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
        )
    },
    {
        label: "Email", href: "mailto:blilidhmina@gmail.com", icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
        )
    },


];


export default function Contact() {
  
    return (
        <section id="contact" className="section-pad relative overflow-hidden" aria-label="Contact">
            {/* Bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 blur-[100px] z-0"
                style={{ background: "radial-gradient(ellipse, rgba(87,73,100,0.25), transparent 70%)" }} />

            <div className="container-max relative z-10">
                <Reveal><p className="text-center text-xs font-bold uppercase tracking-[0.32em] mb-4" style={{ color: "var(--plum)" }}>Get In Touch</p></Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        <span style={{ color: "var(--text-1)" }}>Let&apos;s build something </span><span className="text-gradient">great</span>
                    </h2>
                </Reveal>
                <Reveal delay={0.15}>
                    <p className="text-center max-w-lg mx-auto mb-16 text-sm" style={{ color: "var(--text-3)" }}>
                        Have a project in mind? Looking for a developer? Or just want to say hi? My inbox is always open.
                    </p>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 max-w-5xl mx-auto center">
                
  {/* Info panel */}
<Reveal delay={0.3} className="lg:col-span-2">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full w-5xl">
     {/* RIGHT COLUMN - Contact */}
    <div
      className="p-8 rounded-3xl glass animated-border"
      style={{ boxShadow: "0 4px 24px var(--glow)" }}
    >
      <h3 className="text-2xl font-bold mb-8">
        Contact Information
      </h3>

      <div className="flex flex-col gap-6">
        {/* Email */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/10">
            {socials.find(s => s.label === "Email")?.icon}
          </div>
          <div>
            <p className="text-sm opacity-60">Email</p>
            <a href="mailto:blilidhmina@gmail.com" className="font-semibold hover:underline">
              blilidhmina@gmail.com
            </a>
          </div>
        </div>



        {/* Location */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/10">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          </div>
          <div>
            <p className="text-sm opacity-60">Location</p>
            <p className="font-semibold">Tunisia</p>
          </div>
        </div>
      </div>

      {/* Follow Me */}
      <div className="mt-10">
        <h4 className="font-semibold mb-4">Follow Me</h4>
        <div className="flex gap-4">
          {socials
            .filter(s => s.label === "GitHub" || s.label === "LinkedIn")
            .map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                {s.icon}
              </a>
            ))}
        </div>
      </div>
    </div>


    {/* LEFT COLUMN - Availability */}
    <div
      className="p-8 rounded-3xl glass animated-border"
      style={{ boxShadow: "0 4px 24px var(--glow)" }}
    >
      <h3 className="text-2xl font-bold mb-6">
        Availability
      </h3>

      <ul className="flex flex-col gap-4 text-sm">
        <li className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
          Internships & Apprenticeships
        </li>
        <li className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full" />
          Freelance Projects
        </li>
        <li className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full" />
          Collaborations
        </li>
      </ul>

      <p className="text-xs mt-5 opacity-60">
        Typical response time: &lt; 24 hours
      </p>
    </div>

   
  </div>
</Reveal>
                </div>
            </div>
        </section>
    );
}
