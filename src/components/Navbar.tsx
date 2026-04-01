import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 50);
    setHidden(latest > previous && latest > 150);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-2xl border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#hero"
          className="font-mono text-xl font-bold text-gradient-gold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === "light" ? (
            <img src={logoLight} alt="NP Logo" className="h-8 w-auto" />
          ) : (
            <img src={logoDark} alt="NP Logo" className="h-8 w-auto" />
          )}
        </motion.a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.05 }}
              className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
            >
              {item.label}
              <motion.span
                className="absolute -bottom-1 left-0 h-px bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </motion.a>
          ))}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Sun size={18} />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Moon size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(45 100% 49% / 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-primary text-primary-foreground font-mono text-sm font-semibold rounded-lg transition-all duration-300"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.05 }}
                  className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors py-3 border-b border-border/30"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="mt-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono text-sm font-semibold rounded-lg text-center"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
