import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "CSS", level: 92 },
      { name: "JavaScript", level: 95 },
      { name: "Tailwind CSS", level: 92 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "MySQL", level: 92 },
      { name: "MongoDB", level: 87 },
      { name: "Python", level: 78 },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git & GitHub", level: 95 },
      { name: "Docker", level: 75 },
      { name: "Figma", level: 80 },
      { name: "Photoshop", level: 75 },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "Python", level: 90 },
      { name: "Java", level: 70 },
      { name: "Kotlin", level: 60 },
      { name: "C", level: 70 },
    ],
  },
];

const AnimatedNumber = ({ value, inView }: { value: number; inView: boolean }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, value]);
  return <span>{display}%</span>;
};

const SkillBar = ({ name, level, delay, inView }: { name: string; level: number; delay: number; inView: boolean }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1.5">
      <span className="font-mono text-xs text-foreground">{name}</span>
      <span className="font-mono text-xs text-primary">
        <AnimatedNumber value={level} inView={inView} />
      </span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden relative">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-primary to-gold-bright relative"
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 15, delay }}
      >
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent to-primary/50 blur-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 1, 0] } : {}}
          transition={{ delay: delay + 0.5, duration: 1 }}
        />
      </motion.div>
    </div>
  </div>
);

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 lg:py-32 bg-muted/30 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-2">{"// Skills"}</p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
            Technical <span className="text-gradient-gold">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: ci * 0.12 }}
              whileHover={{ y: -5, borderColor: "hsl(45 100% 49% / 0.3)" }}
              className="p-5 rounded-xl bg-gradient-card border border-border transition-colors"
            >
              <h3 className="font-mono text-sm font-bold text-primary mb-5">{cat.title}</h3>
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={ci * 0.12 + si * 0.08}
                  inView={isInView}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
