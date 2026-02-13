"use client";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconBriefcase,
  IconUsers,
  IconMail,
  IconSparkles,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const links = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full text-foreground" />,
    href: "#",
  },
  {
    title: "Services",
    icon: <IconBriefcase className="h-full w-full text-foreground" />,
    href: "#services",
  },
  {
    title: "Why EnxtAI",
    icon: <IconSparkles className="h-full w-full text-foreground" />,
    href: "#why-us",
  },
  {
    title: "Testimonials",
    icon: <IconUsers className="h-full w-full text-foreground" />,
    href: "#testimonials",
  },
  {
    title: "Contact",
    icon: <IconMail className="h-full w-full text-foreground" />,
    href: "#contact",
  },
  {
    title: "LinkedIn",
    icon: <IconBrandLinkedin className="h-full w-full text-foreground" />,
    href: "#",
  },
];

export function FloatingNav() {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <FloatingDock items={links} />
    </div>
  );
}
