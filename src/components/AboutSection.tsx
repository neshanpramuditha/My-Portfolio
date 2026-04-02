import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Cloud, Database, Palette } from "lucide-react";

const highlights = [
  { icon: Code2, label: "MERN Stack", desc: "Full-stack web development" },
  { icon: Cloud, label: "Cloud & DevOps", desc: "Docker, AWS" },
  { icon: Database, label: "Databases", desc: "MongoDB, PostgreSQL" },
  { icon: Palette, label: "UI/UX Design", desc: "Figma, Responsive Design" },
];

const timeline = [
  { year: "2021", title: "Advanced Level (A/L)", desc: "Successfully passed the G.C.E. Advanced Level Examination, Technology Stream, MO/ Wellassa Central College, District Rank 10" },
  { year: "2021 - Present", title: "BICT (HONS) Software Development", desc: "Began undergraduate studies in Information & Communication Technology, Specialized pathway, Software Development" },
  { year: "2025 - Present", title: "Deep Dive into MERN Stack (Ongoing)", desc: "MERN Stack Development Course, Built full-stack projects with React, Node.js, MongoDB" },
  { year: "2026 - Present", title: "Cloud & AI Exploration (Ongoing)", desc: "Expanded into cloud infrastructure, AI/ML, and scalable system design" },
  { year: "2026", title: "Seeking Opportunities", desc: "Looking for roles in full-stack development & AI engineering" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-2">{"// About Me"}</p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
            Get to Know <span className="text-gradient-gold">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Bio */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-6">
              Dedicated ICT undergraduate passionate about software development, innovation, and impactful collaboration. Currently at the University of Kelaniya, mastering MERN stack, cloud infrastructure, AI, and scalable system design.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-8">
              I thrive on turning complex problems into elegant, user-friendly solutions. My goal is to build products that make a real difference while continuously growing as a developer.
            </motion.p>

            <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, label, desc }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  whileHover={{ scale: 1.04, borderColor: "hsl(45 100% 49% / 0.3)" }}
                  className="p-4 rounded-xl bg-gradient-card border border-border transition-colors duration-300 group cursor-default"
                >
                  <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Icon size={20} className="text-primary mb-2" />
                  </motion.div>
                  <h4 className="font-mono text-sm font-semibold text-foreground">{label}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
          >
            <h3 className="font-mono text-lg font-semibold text-foreground mb-8">My Journey</h3>
            <div className="relative">
              <motion.div
                className="absolute left-4 top-0 bottom-0 w-px bg-border"
                initial={{ scaleY: 0, originY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              />
              {timeline.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                  animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 + i * 0.2 }}
                  whileHover={{ x: 6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="relative pl-12 pb-8 last:pb-0 group cursor-default"
                >
                  <motion.div
                    className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: [0, 1.4, 1] } : {}}
                    transition={{ type: "spring", stiffness: 300, delay: 0.6 + i * 0.2 }}
                  />
                  <motion.div
                    className="absolute left-[15px] top-4 w-px bg-primary/20"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: "100%" } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.2 }}
                  />
                  <span className="font-mono text-xs text-primary">{item.year}</span>
                  <h4 className="font-mono text-sm font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
