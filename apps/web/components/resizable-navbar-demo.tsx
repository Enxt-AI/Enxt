"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export default function NavbarDemo() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-muted-foreground hover:text-foreground"
              >
                {item.name}
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="gradient"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Demo Content */}
      <DummyContent />
    </div>
  );
}

const DummyContent = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-32">
      <p className="mb-4 text-center text-2xl font-bold text-foreground">
        Check the navbar at the top of the container
      </p>

      <p className="mb-10 text-center text-muted-foreground">
        For demo purpose we have kept the position as{" "}
        <span className="font-medium text-primary">Sticky</span>. Keep in mind
        that this component is{" "}
        <span className="font-medium text-primary">fixed</span> and will not
        move when scrolling.
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {[
          { id: 1, title: "The", width: "md:col-span-1" },
          { id: 2, title: "First", width: "md:col-span-2" },
          { id: 3, title: "Rule", width: "md:col-span-1" },
          { id: 4, title: "Of", width: "md:col-span-3" },
          { id: 5, title: "F", width: "md:col-span-1" },
          { id: 6, title: "Club", width: "md:col-span-2" },
          { id: 7, title: "Is", width: "md:col-span-2" },
          { id: 8, title: "You", width: "md:col-span-1" },
          { id: 9, title: "Do NOT TALK about", width: "md:col-span-2" },
          { id: 10, title: "F Club", width: "md:col-span-1" },
        ].map((box) => (
          <div
            key={box.id}
            className={`flex h-60 items-center justify-center rounded-lg bg-muted ${box.width}`}
          >
            <p className="text-lg font-medium text-foreground">{box.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};