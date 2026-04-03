import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import recyclehubMockup from "../assets/recycle-hub-mockup.png";
import libraryMockup from "../assets/library-system-mockup.png";
import etechMockup from "../assets/e-technology-mockup.png";
import meridianMockup from "../assets/meridian-escapes-mockup.png";

const projects = [
  {
    title: "Recycle Hub",
    desc: "A web application addressing Sri Lanka's waste management crisis. Features include Waste Sorting Guide, Second Hand Marketplace, Local Recycling Center Locator, and Tips for fixing broken items.",
    tech: ["Group Project", "Web App", "Vercel"],
    live: "https://recycle-hub-viva.vercel.app/",
    github: "https://github.com/neshanpramuditha/RecycleHub.git",
    num: "01",
    image: recyclehubMockup,
  },
  {
    title: "Library Appointment & Book Donation System",
    desc: "A full-stack web application modernizing core library operations — appointment scheduling, book donation verification, user access control, and reporting with audit logging.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    live: "",
    github: "https://github.com/neshanpramuditha/Library-Management-System.git",
    num: "02",
    image: libraryMockup,
  },
  {
    title: "E Technology SL",
    desc: "A website sharing notes, videos, and papers for the Advanced Level Engineering Technology stream and GIT. My very first beginner-level web project in 2021.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://neshanpramuditha.github.io/E-Technology-SL/index.html",
    github: "https://github.com/neshanpramuditha/E-Technology-SL.git",
    num: "03",
    image: etechMockup,
  },
  {
    title: "AI Front End Design Project",
    desc: "A website created entirely using AI for the AI Diploma, designed as a travel platform for MERIDIAN ESCAPES.",
    tech: ["Vite", "TypeScript", "React", "Tailwind CSS"],
    live: "https://meridian-escapes.vercel.app/",
    github: "https://github.com/neshanpramuditha/Meridian-Escapes.git",
    num: "04",
    image: meridianMockup,
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0.01px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl border border-border bg-gradient-card overflow-hidden"
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 bg-primary/5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Top accent line */}
      <motion.div
        className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />

      <div className="p-6 relative">
         {project.image && (
           <div className="mb-4 rounded-lg overflow-hidden">
             <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
           </div>
         )}
         <div className="flex items-start justify-between mb-3">
           <div>
             <span className="font-mono text-[10px] text-primary/50 tracking-widest">{project.num}</span>
             <h3 className="font-mono text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
               {project.title}
             </h3>
           </div>
           <motion.div
             animate={{ rotate: hovered ? 0 : 45, scale: hovered ? 1.2 : 1 }}
             transition={{ type: "spring", stiffness: 300, damping: 15 }}
           >
             <ArrowUpRight size={18} className="text-primary" />
           </motion.div>
         </div>

         <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.desc}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t, ti) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + ti * 0.05, type: "spring", stiffness: 200 }}
              className="px-2.5 py-1 text-xs font-mono bg-muted text-muted-foreground rounded-md border border-border"
            >
              {t}
            </motion.span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(45 100% 49% / 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold bg-primary text-primary-foreground rounded-lg transition-colors"
            >
              <ExternalLink size={12} /> Live Demo
            </motion.a>
          )}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono border border-border text-muted-foreground rounded-lg hover:text-primary hover:border-primary/30 transition-colors"
          >
            <Github size={12} /> Source
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0.01px)" } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-2">{"// Projects"}</p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
            Featured <span className="text-gradient-gold">Work</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">
            A selection of projects showcasing my expertise in full-stack development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
