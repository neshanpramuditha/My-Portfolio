import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoLoading from "@/assets/logo-loading.png";
import { Progress } from "@/components/ui/progress";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const intervalMs = 50;
    const steps = duration / intervalMs;
    const increment = 100 / steps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + increment;
      });
    }, intervalMs);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src={logoLoading}
        alt="NP Logo"
        className="w-28 h-28 mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.p
        className="text-sm tracking-[0.35em] uppercase text-muted-foreground font-mono mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Doing Something Great
      </motion.p>
      <motion.div
        className="w-56"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Progress value={Math.min(progress, 100)} className="h-1.5 bg-muted" />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
