import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  return (
    <main className="relative z-0 min-h-screen bg-paper">
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Skills />
      <Stats />
      <Contact />
      <Footer />
      <Analytics />
    </main>
  );
}
