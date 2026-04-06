import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTiktok,
  faGithub,
  faJs,
  faReact,
  faNodeJs,
  faPython,
  faHtml5,
  faCss3Alt,
  faPhp,
  faLaravel,
} from "@fortawesome/free-brands-svg-icons";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

/**
 * KONSTANTA & KONFIGURASII
 */
const FIRST_NAME = "ALIEF FAISAL";
const LAST_NAME = "ADRIANSYAH";
const RESUME_URL =
  "https://drive.google.com/uc?export=download&id=18bytxeOtIvMx04LPyY_n3DLhBdYgfq37";
const ROLES = ["Fullstack", "Frontend", "Backend"];

const TECH_ICONS = [
  { icon: faJs, color: "#F7DF1E" },
  { icon: faReact, color: "#61DAFB" },
  { icon: faNodeJs, color: "#339933" },
  { icon: faPython, color: "#3776AB" },
  { icon: faHtml5, color: "#E34F26" },
  { icon: faCss3Alt, color: "#1572B6" },
  { icon: faPhp, color: "#777BB4" },
  { icon: faLaravel, color: "#FF2D20" },
];

export default function HeroSection() {
  /**
   * STATES
   */
  const [displayFirst, setDisplayFirst] = useState("");
  const [displayLast, setDisplayLast] = useState("");
  const [particlesInitialized, setParticlesInitialized] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // State untuk kontrol efek glare

  /**
   * SCROLL ANIMATION LOGIC
   */
  const { scrollYProgress } = useScroll();
  const xTranslation = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const springX = useSpring(xTranslation, { stiffness: 100, damping: 30 });

  /**
   * TYPING EFFECT LOGIC
   */
  useEffect(() => {
    let i = 0;
    const fullText = FIRST_NAME + " " + LAST_NAME;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        if (i <= FIRST_NAME.length) {
          setDisplayFirst(fullText.slice(0, i));
        } else {
          setDisplayFirst(FIRST_NAME);
          setDisplayLast(fullText.slice(FIRST_NAME.length + 1, i));
        }
        i++;
      } else {
        clearInterval(interval);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  /**
   * ROLE SWITCHER LOGIC
   */
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(roleInterval);
  }, []);

  /**
   * PARTICLES INITIALIZATION
   */
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setParticlesInitialized(true);
    });
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden bg-background">
      {/* BACKGROUND PARTICLES */}
      {particlesInitialized && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
      )}

      <div className="max-w-5xl w-full flex flex-col items-center text-center relative z-10">
        {/* ROLE SWITCHER */}
        <div className="flex items-center justify-center gap-2 h-[40px] mb-4 uppercase text-muted-foreground font-bold text-[18px] md:text-[22px]">
          <div className="relative h-full flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIndex]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "circOut" }}
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span>Developer</span>
        </div>

        {/* NAMA DENGAN EFEK GLARE SAAT HOVER */}
        <motion.h1
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            backgroundPosition: isHovered ? ["-200% 0", "200% 0"] : "0% 0",
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
          style={{
            backgroundImage: isHovered
              ? "linear-gradient(110deg, currentColor 40%, rgba(255,255,255,0.8) 50%, currentColor 60%)"
              : "none",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: isHovered ? "transparent" : "currentColor",
          }}
          className="flex flex-col items-center leading-[0.85] text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-foreground mb-12 font-medium uppercase cursor-default"
        >
          <span>{displayFirst}</span>

          <div className="flex items-center justify-center">
            <span>{displayLast}</span>
            {/* KURSOR KETIK */}
            <span
              className="inline-block w-[3px] md:w-[6px] h-[0.7em] bg-foreground/40 ml-2 animate-pulse self-center"
              style={{
                WebkitTextFillColor: "initial",
                WebkitBackgroundClip: "none",
              }}
            />
          </div>
        </motion.h1>

        {/* CTAS & SOCIALS */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <a
            href={RESUME_URL}
            download
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border bg-black text-white font-medium transition-all duration-300 hover:bg-zinc-900 active:scale-95"
          >
            <FontAwesomeIcon
              icon={faDownload}
              className="text-sm group-hover:animate-bounce"
            />
            <span>Download Resume</span>
          </a>

          <div className="flex items-center gap-2 p-2 border border-border rounded-full bg-muted/10 backdrop-blur-sm">
            <SocialIcon href="#" icon={faGithub} label="GitHub" />
            <SocialIcon href="#" icon={faInstagram} label="Instagram" />
            <SocialIcon href="#" icon={faTiktok} label="TikTok" />
          </div>
        </div>
      </div>

      {/* WAVE TECH MARQUEE (PARALLAX SCROLL) */}
      <div className="absolute bottom-12 left-0 w-full overflow-hidden pointer-events-none select-none opacity-20 md:opacity-30">
        <motion.div
          style={{ x: springX }}
          className="flex whitespace-nowrap gap-12 md:gap-24 items-center"
        >
          {[...Array(3)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex gap-12 md:gap-24">
              {TECH_ICONS.map((tech, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: idx * 0.2,
                    ease: "easeInOut",
                  }}
                  className="text-4xl md:text-6xl lg:text-7xl"
                  style={{ color: tech.color }}
                >
                  <FontAwesomeIcon icon={tech.icon} />
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * KOMPONEN SOCIAL ICON REUSABLE
 */
function SocialIcon({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center h-12 px-4 rounded-full text-muted-foreground hover:text-foreground hover:bg-background transition-all duration-300 ease-out"
    >
      <FontAwesomeIcon icon={icon} className="text-xl" />
      <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:ml-3 transition-all duration-500 text-sm font-semibold whitespace-nowrap">
        {label}
      </span>
    </a>
  );
}

/**
 * CONFIG TSPARTICLES
 */
const particlesOptions = {
  fpsLimit: 120,
  interactivity: {
    events: { onHover: { enable: true, mode: "grab" }, resize: true },
    modes: { grab: { distance: 200, links: { opacity: 0.2, color: "#888" } } },
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
