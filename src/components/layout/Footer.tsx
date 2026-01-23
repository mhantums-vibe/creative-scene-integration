import { motion } from "framer-motion";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const footerLinks = {
  services: [
    { name: "Website Development", href: "/services" },
    { name: "App Development", href: "/services" },
    { name: "Hosting & Domain", href: "/services" },
    { name: "Graphic Design", href: "/services" },
    { name: "Video Editing", href: "/services" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "FAQ", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative text-white backdrop-blur-2xl bg-black/60 border-t border-white/10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">Y</span>
                </div>
                <span className="text-xl font-bold">
                  Yess<span className="text-primary">Bangal</span>
                </span>
              </div>

              <p className="text-white/70 mb-6 max-w-sm leading-relaxed">
                Transforming businesses with innovative digital solutions. 
                We build websites, apps, and digital experiences that drive growth.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Mail className="w-4 h-4 text-primary" />
                  info@yessbangal.com
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Phone className="w-4 h-4 text-primary" />
                  +880 1XXX-XXXXXX
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <MapPin className="w-4 h-4 text-primary" />
                  Dhaka, Bangladesh
                </div>
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-white/70 mb-4">
              Subscribe to get updates on our latest offers and news.
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-11 backdrop-blur-xl"
              />
              <Button variant="hero" className="w-full">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/15 backdrop-blur-2xl bg-black/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} YessBangal. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
