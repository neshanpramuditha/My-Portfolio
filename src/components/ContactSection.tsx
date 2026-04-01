import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin, ExternalLink, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      await emailjs.send(
        "service_8k0ig2x",
        "template_0nyhm0g",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "neshanpramu2@gmail.com",
        },
        "xrYUAq5zfpH3lo8so"
      );
      setSubmitted(true);
      toast({
        title: "✅ Message sent successfully!",
        description: "I'll reply to you soon...",
      });
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "❌ Failed to send message",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/neshanpramuditha" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/neshan-pramuditha-5170a1328" },
    { icon: Mail, label: "Email", href: "mailto:neshanpramu2@gmail.com" },
    { icon: ExternalLink, label: "Credly", href: "https://credly.com/users/neshan-premarathna" },
  ];

  const inputClasses = "w-full px-4 py-3 bg-card border border-border rounded-xl font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300";

  return (
    <section id="contact" className="py-24 lg:py-32 bg-muted/30 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-2">{"// Contact"}</p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
            Let's <span className="text-gradient-gold">Connect</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="space-y-5"
          >
            {[
              { label: "Name", type: "text", key: "name" as const, placeholder: "Your name" },
              { label: "Email", type: "email", key: "email" as const, placeholder: "your@email.com" },
            ].map((field, i) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <label className="font-mono text-xs text-muted-foreground mb-1.5 block">{field.label}</label>
                <input
                  type={field.type}
                  required
                  value={formData[field.key]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  className={inputClasses}
                  placeholder={field.placeholder}
                />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <label className="font-mono text-xs text-muted-foreground mb-1.5 block">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClasses} resize-none`}
                placeholder="Tell me about your project..."
              />
            </motion.div>
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(45 100% 49% / 0.25)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono font-semibold rounded-xl transition-colors disabled:opacity-60"
            >
              {submitted ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle size={16} /> Message Sent!
                </motion.span>
              ) : sending ? (
                <>Sending...</>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ y: -3 }}
              className="p-5 rounded-xl bg-gradient-card border border-border"
            >
              <div className="flex items-center gap-3 mb-3">
                <Mail size={16} className="text-primary" />
                <span className="font-mono text-sm text-foreground">neshanpramu2@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-primary" />
                <span className="font-mono text-sm text-foreground"><span className="font-mono text-sm text-foreground">Bibile, Sri Lanka</span></span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="p-5 rounded-xl bg-gradient-card border border-border"
            >
              <h4 className="font-mono text-sm font-semibold text-foreground mb-4">Find Me Online</h4>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon: Icon, label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    whileHover={{ scale: 1.05, borderColor: "hsl(45 100% 49% / 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border hover:bg-primary/5 transition-colors"
                  >
                    <Icon size={14} className="text-primary" />
                    <span className="font-mono text-xs text-muted-foreground">{label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="p-5 rounded-xl border border-primary/20 bg-primary/5"
            >
              <p className="font-mono text-sm text-primary font-semibold">🟢 Currently open to:</p>
              <ul className="mt-2 space-y-1">
                {["Software Developer Internships", "Freelance MERN Projects", "Open Source Collaboration"].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="text-xs text-muted-foreground flex items-center gap-2"
                  >
                    <span className="text-primary">▹</span> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
