import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="py-8 border-t border-border">
    <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="font-mono text-xs text-muted-foreground">
        ©{new Date().getFullYear()} Neshan Pramuditha&nbsp;
      </p>
      <div className="flex gap-3">
        {[
          { icon: Github, href: "https://github.com/neshanpramuditha" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/neshan-pramuditha-5170a1328" },
          { icon: Mail, href: "mailto:neshanpramu2@gmail.com" },
        ].map(({ icon: Icon, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Social link"
          >
            <Icon size={14} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
