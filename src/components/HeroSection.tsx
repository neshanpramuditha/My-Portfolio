import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Heart } from "lucide-react";
import { useCallback } from "react";

import heroBg from "@/assets/hero-bg.jpg";

const roles = [
  "MERN Stack Developer",
  "Full-Stack Developer",
  "UI/UX Enthusiast",
  "AI & DevOps Learner",
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 150, damping: 20 } },
};

const FloatingParticle = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{
      y: [-30, 30, -30],
      x: [-10, 10, -10],
      opacity: [0.1, 0.5, 0.1],
      scale: [1, 1.5, 1],
    }}
    transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

const HeroSection = () => {
  const [hearts, setHearts] = useState(() => {
    const saved = localStorage.getItem("portfolio-hearts");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [hasReacted, setHasReacted] = useState(() => localStorage.getItem("portfolio-hearted") === "true");

  const handleHeart = useCallback(() => {
    if (hasReacted) {
      const newCount = Math.max(0, hearts - 1);
      setHearts(newCount);
      localStorage.setItem("portfolio-hearts", String(newCount));
      localStorage.removeItem("portfolio-hearted");
      setHasReacted(false);
    } else {
      const newCount = hearts + 1;
      setHearts(newCount);
      localStorage.setItem("portfolio-hearts", String(newCount));
      localStorage.setItem("portfolio-hearted", "true");
      setHasReacted(true);
    }
  }, [hearts, hasReacted]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const photoX = useTransform(springX, [-500, 500], [15, -15]);
  const photoY = useTransform(springY, [-500, 500], [15, -15]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          if (displayText.length === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >

      {/* Floating particles */}
      {[
        { delay: 0, x: "10%", y: "20%", size: 3 },
        { delay: 1, x: "25%", y: "60%", size: 2 },
        { delay: 2, x: "40%", y: "30%", size: 4 },
        { delay: 0.5, x: "60%", y: "70%", size: 2 },
        { delay: 1.5, x: "75%", y: "25%", size: 3 },
        { delay: 3, x: "85%", y: "55%", size: 2 },
        { delay: 0.8, x: "50%", y: "15%", size: 3 },
        { delay: 2.5, x: "15%", y: "80%", size: 2 },
        { delay: 1.2, x: "90%", y: "40%", size: 4 },
        { delay: 3.5, x: "35%", y: "85%", size: 2 },
      ].map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text with staggered children */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex-1 text-center lg:text-left"
        >
          <motion.p variants={fadeUp} className="font-mono text-sm text-primary mb-4 tracking-widest uppercase">
            {"// Hello, I'm"}
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-mono text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 leading-tight">
            <span className="text-foreground">Neshan</span>
            <br />
            <span className="text-gradient-gold">Pramuditha</span>
          </motion.h1>
          <motion.div variants={fadeUp} className="font-mono text-lg sm:text-xl text-muted-foreground mb-2 h-8">
            <span>{displayText}</span>
            <span className="border-r-2 border-primary animate-blink ml-0.5">&nbsp;</span>
          </motion.div>
          <motion.p variants={fadeUp} className="text-muted-foreground text-sm mb-8 max-w-md mx-auto lg:mx-0">
            ICT Undergraduate @ University of Kelaniya · Building scalable web applications
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(45 100% 49% / 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary text-primary-foreground font-mono font-semibold rounded-lg transition-colors text-center"
            >
              View Projects
            </motion.a>
            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.05, borderColor: "hsl(45 100% 49% / 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-primary/30 text-primary font-mono font-semibold rounded-lg transition-colors text-center"
            >
              Download CV
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-4 justify-center lg:justify-start">
            {[
              { icon: Github, href: "https://github.com/neshanpramuditha", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/neshan-pramuditha-5170a1328", label: "LinkedIn" },
              { icon: Mail, href: "mailto:neshanpramu2@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, borderColor: "hsl(45 100% 49% / 0.5)" }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors border-muted-foreground"
                aria-label={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
            <motion.button
              onClick={handleHeart}
              whileHover={{ scale: 1.15, borderColor: "hsl(0 80% 55% / 0.5)" }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 border rounded-lg flex items-center justify-center transition-colors border-muted-foreground ${hasReacted ? "text-red-500 border-red-500/50" : "text-muted-foreground hover:text-red-500"}`}
              aria-label="Love this portfolio"
            >
              <Heart size={18} fill={hasReacted ? "currentColor" : "none"} />
            </motion.button>
            {hearts > 0 && (
              <span className="text-xs text-muted-foreground font-mono self-center">{hearts}</span>
            )}
          </motion.div>
        </motion.div>

        {/* Photo with magnetic follow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.6 }}
          style={{ x: photoX, y: photoY }}
          className="flex-shrink-0 -ml-8 lg:-ml-16"
        >
          <img
            src="/videos/3d-character.gif"
            alt="3D Character Animation"
            className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem] object-contain"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.span className="font-mono text-[10px] text-muted-foreground/50 tracking-widest uppercase">
          Scroll
        </motion.span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={16} className="text-primary/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
