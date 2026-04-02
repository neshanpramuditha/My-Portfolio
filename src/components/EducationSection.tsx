import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, BookOpen, ExternalLink } from "lucide-react";
import ibscLogo from "@/assets/ibsc-logo.jpg";
import skyrecLogo from "@/assets/skyrec-logo.jpg";
import uokLogo from "@/assets/uok-logo.png";
import schoolLogo from "@/assets/school-logo.png";
import ciscoBadge from "@/assets/cisco-badge.png";
import harvardBadge from "@/assets/harvard-badge.png";
import hackerrankBadge from "@/assets/hackerrank-badge.png";
import simplilearnBadge from "@/assets/simplilearn-badge.png";
import ciscoItBadge from "@/assets/cisco-it-essentials-badge.png";
import linkedinBadge from "@/assets/linkedin-learning-badge.png";
import ibmBadge from "@/assets/ibm-badge.png";
import warltonBadge from "@/assets/warlton-badge.png";
import osloBadge from "@/assets/oslo-badge.png";

const educationItems = [
  {
    icon: BookOpen,
    period: "2026 – Present",
    title: "Diploma in Artificial Intelligence (Ongoing)",
    institution: "IBSC Campus",
    details: [],
    logo: ibscLogo,
  },
  {
    icon: BookOpen,
    period: "2025 – Present",
    title: "MERN Stack Development Course (Ongoing)",
    institution: "SKYREC Academy",
    details: [],
    logo: skyrecLogo,
  },
  {
    icon: GraduationCap,
    period: "2022 – Present",
    title: "BSc in Information & Communication Technology",
    institution: "University of Kelaniya, Sri Lanka",
    details: [
      "Specializing in Software Development",
      "Relevant coursework: Data Structures, Web Development, Database Systems, Cyber Security, Networking, Software Engineering, Mobile App Development",
    ],
    logo: uokLogo,
  },
  {
    icon: BookOpen,
    period: "2021",
    title: "GCE Advanced Level (Technology Stream)",
    institution: "Mo / Wellassa Central College, Bibile, Sri Lanka",
    details: [
      "Completed A/L examinations with the District rank 10",
      "Foundation in mathematics, physics, ICT, and logical thinking",
    ],
    logo: schoolLogo,
  },
];

const certifications = [
  { name: "MERN Stack Development Course (Ongoing)", issuer: "SKYREC Academy", date: "2025 – Present", url: null },
  { name: "Diploma in Artificial Intelligence (Ongoing)", issuer: "IBSC Campus", date: "2026 – Present", url: null },
  { name: "Linux Essentials", issuer: "Cisco Networking Academy", date: "2026-02", url: "https://www.credly.com/badges/7363db9e-535b-4bbe-9a9b-2ccf44c41d64/public_url", badge: ciscoBadge },
  { name: "Introduction to Programming with Python", issuer: "HarvardX CS50", date: "2026-01", url: "https://www.credly.com/badges/306b87e1-9c48-4648-b419-29f79e9e7820/public_url", badge: harvardBadge },
  { name: "CSS (Basic)", issuer: "HackerRank", date: "2025-10", url: "https://www.hackerrank.com/certificates/718a23b4b327", badge: hackerrankBadge },
  { name: "GIT Training", issuer: "Simpli Learn | Skill Up", date: "2025-10", url: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI3NTgiLCJjZXJ0aWZpY2F0ZV91cmwiOiJodHRwczpcL1wvY2VydGlmaWNhdGVzLnNpbXBsaWNkbi5uZXRcL3NoYXJlXC85MTA0ODE0XzkzNTc3MjQxNzU5Njc5MDA4ODAzLnBuZyIsInVzZXJuYW1lIjoiTmVzaGFuIFByZW1hcmF0aG5hIn0%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F2823%2FGIT%2Fcertificate%2Fdownload-skillup&%24web_only=true", badge: simplilearnBadge },
  { name: "IT Essentials", issuer: "Cisco Networking Academy", date: "2025-07", url: "https://www.credly.com/badges/6242dea5-53a3-4fef-8087-e79cc99594ea/public_url", badge: ciscoItBadge },
  { name: "Cybersecurity Awareness: Cybersecurity Terminology", issuer: "LinkedIn Learning", date: "2024-11", url: "https://www.linkedin.com/learning/certificates/5145240cc491e5b8837ca11f5e44120d2c854b9a90d2e755be40b797909499d7?trk=share_certificate", badge: linkedinBadge },
  { name: "Prompt Engineering for Everyone", issuer: "IBM | Cognitive Class", date: "2024-12", url: "https://courses.cognitiveclass.ai/certificates/59149e90649a41dab905b2cc6e64c0db", badge: ibmBadge },
  { name: "Logo Design Workshop", issuer: "Warlton International Campus", date: "2022-01", url: "https://drive.google.com/file/d/1NYj97Onhb2hNcUW7bVxOd7IDQxhU-wfU/view", badge: warltonBadge },
  { name: "Diploma in Graphic Designing", issuer: "Oslo Computer College", date: "2021-12", url: "https://drive.google.com/file/d/1_-u8EpDMtcVrRVqZ8vPP7-yTvNz3vmvl/view?usp=sharing", badge: osloBadge },
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-2">{"// Education"}</p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
            Qualifications & <span className="text-gradient-gold">Certifications</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {educationItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
              whileHover={{ y: -3, borderColor: "hsl(45 100% 49% / 0.3)" }}
              className="mb-6 p-6 rounded-xl bg-gradient-card border border-border transition-colors cursor-default"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon size={18} className="text-primary" />
                </motion.div>
                <div className="flex-1">
                  <span className="font-mono text-xs text-primary">{item.period}</span>
                  <h3 className="font-mono text-base font-bold text-foreground mt-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.institution}</p>
                  <ul className="mt-3 space-y-1">
                    {item.details.map((d, di) => (
                      <motion.li
                        key={d}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: i * 0.15 + di * 0.08 + 0.3 }}
                        className="text-xs text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">▹</span> {d}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                {item.logo && (
                  <img
                    src={item.logo}
                    alt={`${item.institution} logo`}
                    className="w-[100px] h-[100px] rounded-lg object-contain flex-shrink-0"
                  />
                )}
              </div>
            </motion.div>
          ))}

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="mt-10 p-6 rounded-xl bg-gradient-card border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <Award size={18} className="text-primary" />
              <h3 className="font-mono text-base font-bold text-foreground">Certifications & Badges</h3>
            </div>
            <div className="space-y-3">
              {certifications.map((cert, ci) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ type: "spring", stiffness: 200, delay: 0.5 + ci * 0.08 }}
                  whileHover={{ scale: 1.02, borderColor: "hsl(45 100% 49% / 0.3)" }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/50 border border-border transition-colors cursor-default"
                >
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/10 text-primary font-mono text-[10px] font-semibold hover:bg-primary/20 transition-colors"
                    >
                      <ExternalLink size={10} />
                      Credentials
                    </a>
                  ) : (
                    <span className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-mono text-[10px] font-semibold">
                      Pending...
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-foreground font-medium">{cert.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">| {cert.issuer} | {cert.date}</span>
                  </div>
                  {(cert as any).badge && (
                    <img
                      src={(cert as any).badge}
                      alt={`${cert.name} badge`}
                      className="w-10 h-10 rounded object-contain flex-shrink-0"
                    />
                  )}
                </motion.div>
              ))}
            </div>
            <motion.a
              href="https://credly.com/users/neshan-premarathna"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-1 mt-4 font-mono text-xs text-primary hover:underline"
            >
              View all on Credly →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
