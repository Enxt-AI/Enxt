"use client";

import {
  Mail,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  MapPin,
  Phone,
  Send,
  Clock,
  Facebook,
  Youtube,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spotlight } from "@/components/ui/spotlight";
import { useEffect, useState } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
  text: Send,
  Linkedin: Linkedin,
  Twitter: Twitter,
  Github: Github,
  Instagram: Instagram,
  Facebook: Facebook,
  Youtube: Youtube,
  Globe: Globe,
};

interface ContactInfoItem {
  id: string;
  label: string;
  value: string;
  type: string;
  order: number;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  active: boolean;
  order: number;
}

export function Footer() {
  const [contactInfo, setContactInfo] = useState<ContactInfoItem[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    // Fetch Contact Info
    fetch("/api/contact-info")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setContactInfo(data);
      })
      .catch((err) => console.error("Failed to load contact info:", err));

    // Fetch Social Links
    fetch("/api/socials")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSocialLinks(data);
      })
      .catch((err) => console.error("Failed to load social links:", err));
  }, []);

  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-900 relative overflow-hidden font-sans">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Company Info - Span 2 Cols */}
          <div className="lg:col-span-2 space-y-6">
            <a
              href="/"
              className="text-3xl font-bold inline-block tracking-tighter"
            >
              <span className="text-white">Enxt</span>
              <span className="text-violet-500">AI</span>
            </a>
            <p className="text-zinc-500 leading-relaxed max-w-sm">
              Transforming businesses with cutting-edge AI solutions. We build
              independent, intelligent systems for the scalable future.
            </p>

            {/* Contact Info - Explicit */}
            <div className="space-y-4 pt-2">
              {contactInfo
                .filter((info) =>
                  ["address", "phone", "email"].includes(info.type),
                )
                .sort((a, b) => {
                  const order = { address: 1, phone: 2, email: 3 };
                  return (
                    (order[a.type as keyof typeof order] || 99) -
                    (order[b.type as keyof typeof order] || 99)
                  );
                })
                .map((info) => {
                  const IconComponent = iconMap[info.type] || MapPin;
                  return (
                    <div
                      key={info.id}
                      className="flex items-center gap-3 text-sm group cursor-pointer transition-colors hover:text-white"
                    >
                      <IconComponent className="w-4 h-4 text-violet-500 group-hover:text-violet-400 transition-colors" />
                      <span>{info.value}</span>
                    </div>
                  );
                })}
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => {
                const SocialIcon = iconMap[social.icon] || Globe;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    className="w-10 h-10 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center hover:bg-violet-500/10 hover:border-violet-500/50 hover:text-violet-400 transition-all duration-300"
                    aria-label={social.platform}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Section 1 */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
            <nav className="flex flex-col space-y-4">
              {[
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/solution" },
                { label: "Gallery", href: "/gallery" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm hover:text-violet-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Links Section 2 */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-6">Services</h3>
            <nav className="flex flex-col space-y-4">
              {[
                "AI Solutions",
                "Machine Learning",
                "Data Analytics",
                "Automation",
                "Consulting",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm hover:text-violet-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter - Span 2 Cols */}
          {/* <div className="lg:col-span-2">
            <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl">
              <h3 className="text-white font-semibold text-lg mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-zinc-500 text-sm mb-6">
                Get the latest updates and insights about AI directly to your
                inbox.
              </p>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-black/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-violet-500 focus:ring-violet-500/20"
                />
                <Button className="w-full bg-white text-black hover:bg-zinc-200 font-semibold">
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-zinc-600">
              © {new Date().getFullYear()} EnxtAI. All rights reserved.
            </p>
            {/* <div className="flex gap-8 text-sm font-medium">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ),
              )}
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
