import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

// --- 1. DATA PROJECTS ---
const projects = [
  {
    id: 1,
    title: "SIGAP",
    description:
      "Platform pencarian layanan kesehatan menggunakan deteksi GPS.",
    image: "https://i.ibb.co.com/5h6pqwBv/Screenshot-811.png",
    demoUrl: "https://sigap-care.vercel.app/",
  },
  {
    id: 2,
    title: "URBNX",
    description: "Website Katalog Produk Fahsion Modern.",
    image: "https://i.ibb.co.com/vxGKPrxS/Screenshot-814.png",
    demoUrl: "https://urbnx.vercel.app/",
  },
  {
    id: 3,
    title: "BUSALIME",
    description: "Website Profil Perusahaan Cairan Pencuci Piring.",
    image: "https://i.ibb.co.com/JFzQnFzf/Screenshot-815.png",
    demoUrl: "https://busalime.vercel.app/",
  },
  {
    id: 4,
    title: "POKTAN PANDEGLANG",
    description: "Website Sederhana Simulasi Pencarian Kelompok Tani Padi.",
    image: "https://i.ibb.co.com/7xd3qkBP/Screenshot-816.png",
    demoUrl: "https://pemetaanpoktan-pandeglang.vercel.app/",
  },
];

// --- 2. CONFIG PARTICLES ---
const particlesOptions = {
  fpsLimit: 120,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      resize: true,
    },
    modes: {
      grab: { distance: 200, links: { opacity: 0.2, color: "#888" } },
    },
  },
  particles: {
    color: { value: ["#a1a1aa", "#d4d4d8"] },
    move: {
      enable: true,
      speed: { min: 0.3, max: 1 },
      direction: "top",
      random: true,
      outModes: "out",
    },
    number: { density: { enable: true, area: 800 }, value: 60 },
    opacity: { value: { min: 0.1, max: 0.3 } },
    size: { value: { min: 1, max: 4 } },
    shape: { type: "circle" },
  },
  detectRetina: true,
};

// --- 3. INDIVIDUAL PROJECT CARD ---
function ProjectCard({ project, index, isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.9 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 1,
        delay: isMobile ? 0 : (index % 2) * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <a
        href={project.demoUrl}
        target="_blank" // Membuka di tab baru
        rel="noopener noreferrer" // Keamanan tambahan untuk target="_blank"
        className="group block relative w-full mb-16 md:mb-0"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-muted/20 backdrop-blur-sm transition-all duration-700 group-hover:shadow-2xl border">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute top-8 right-8 z-20 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <div className="bg-background/80 backdrop-blur-xl p-4 rounded-full border border-border/50 shadow-xl">
              <ArrowUpRight size={24} />
            </div>
          </div>
        </div>
        <div className="mt-8 px-4 text-foreground">
          <h3 className="text-3xl md:text-5xl font-medium tracking-tighter mb-4">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-lg font-light line-clamp-2 max-w-xl opacity-80 group-hover:opacity-100 transition-opacity">
            {project.description}
          </p>
          <div className="mt-6 h-[1px] w-full bg-border/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-foreground translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]" />
          </div>
        </div>
      </a>
    </motion.div>
  );
}

// --- 4. MAIN EXPORT COMPONENT ---
export default function ProjectSection() {
  const [particlesInitialized, setParticlesInitialized] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setParticlesInitialized(true);
    });
  }, []);

  return (
    <section className="relative py-32 bg-background overflow-hidden min-h-screen">
      {/* Interactive Background */}
      {particlesInitialized && (
        <Particles
          id="project-particles"
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Container Utama sesuai request */}
      <div className="mx-auto max-w-[1320px] px-4 md:px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          className="text-5xl md:text-8xl font-medium tracking-tighter mb-24 uppercase text-foreground"
        >
          Selected{" "}
          <span className="text-muted-foreground/30 italic font-light">
            Works
          </span>
        </motion.h2>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-x-12 gap-y-32">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} isMobile={false} />
          ))}
        </div>

        {/* Mobile Layout with Tooltip */}
        <div className="md:hidden relative">
          <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 pb-12">
            {projects.map((p, i) => (
              <div key={p.id} className="flex-shrink-0 w-[85vw] snap-center">
                <ProjectCard project={p} index={i} isMobile={true} />
              </div>
            ))}
          </div>

          {/* Tooltip Geser Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center gap-2 text-muted-foreground/60 text-sm font-medium uppercase tracking-widest"
          >
            <MoveHorizontal size={16} className="animate-pulse" />
            <span>Geser untuk lainnya</span>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
