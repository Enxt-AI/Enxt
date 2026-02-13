"use client";
import { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const solutions = [
  {
    title: "Autonomous Agents",
    href: "/solution/business-automation",
    description: "Deploy intelligent agents to automate complex workflows.",
  },
  {
    title: "SLMs & BI",
    href: "/solution/business-intelligence",
    description: "Secure, local language models for deep data insights.",
  },
  {
    title: "Fintech",
    href: "/solution/fintech",
    description:
      "Fraud detection, trading algorithms, and smart financial tools.",
  },
  {
    title: "AI Filmmaking",
    href: "/solution/ai-filmmaking",
    description: "Script-to-screen automation and generative VFX.",
  },
  {
    title: "Social Media & Avatars",
    href: "/solution/social-media",
    description: "Digital twins and automated content engagement.",
  },
  {
    title: "Ad & Marketing",
    href: "/solution/marketing",
    description: "Hyper-personalized campaigns and copy generation.",
  },
  {
    title: "Consultation",
    href: "/solution/consultation",
    description: "Strategic roadmaps and feasibility audits.",
  },
];

const navItems = [
  { name: "Our Mentors", link: "/mentors" },
  { name: "Gallery", link: "/gallery" },
  { name: "Careers", link: "/careers" },
  { name: "Blogs", link: "/blogs" },
  { name: "Contact", link: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed z-50 transition-all duration-500 ease-in-out",
        scrolled
          ? "top-6 left-0 right-0 max-w-5xl mx-auto rounded-full bg-white/80 backdrop-blur-2xl border border-gray-200/50 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-4 md:px-8"
          : "top-0 left-0 right-0 max-w-full bg-transparent py-8 border-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          scrolled ? "w-full" : "container mx-auto px-6",
        )}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-display font-bold text-gray-900 transition-transform group-hover:scale-105">
            Enxt<span className="text-violet-600">AI</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:scale-105 transform duration-200 p-0 h-auto gap-1">
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background/95 backdrop-blur-3xl">
                    {solutions.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:scale-105 transform duration-200"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground hover:bg-accent rounded-full transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {/* Mobile Solutions Dropdown */}
              <div>
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="flex items-center justify-between w-full text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  Solutions
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 transition-transform",
                      mobileSolutionsOpen && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {mobileSolutionsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 flex flex-col gap-4 mt-4 border-l border-border/50"
                    >
                      {solutions.map((solution) => (
                        <a
                          key={solution.title}
                          href={solution.href}
                          className="text-base text-muted-foreground hover:text-primary transition-colors block"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {solution.title}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  href={item.link}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <Button className="w-full" size="lg">
                  Get Started
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
