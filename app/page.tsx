import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Experience from "./components/Education";
import Contact from "./components/Contact";
import Volunteering from "./components/Certificate";
import Experiences from "./components/WorkExperience";
import WorkExperience from "./components/WorkExperience";


export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Global animated gradient blobs */}
      <AnimatedBackground />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <WorkExperience />
      <Volunteering /> 
      <Experience />
      <Contact />
      
      

      

      {/* Footer */}
      <footer className="py-8 text-center text-xs border-t" style={{ borderColor: "var(--border)", color: "var(--text-3)" }}>
        <p>
          Crafted with ❤️ by{" "}
          <span className="font-semibold text-gradient">Mina</span> · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
