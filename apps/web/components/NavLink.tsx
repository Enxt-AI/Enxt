"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkComponentProps extends Omit<LinkProps, "className"> {
  children?: React.ReactNode;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string; // Kept for compatibility but unused
  to?: string; // React Router compatibility
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkComponentProps>(
  (
    { className, activeClassName, pendingClassName, href, to, ...props },
    ref,
  ) => {
    const pathname = usePathname();
    const target = (to || href || "") as string;
    const isActive = pathname === target;

    return (
      <Link
        ref={ref}
        href={target}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
