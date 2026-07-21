import Link from "next/link";

import { cn } from "@/lib/utils";
import { UserDropdown } from "./navbar/UserDropdown";

export function Navbar() {
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary" />
          <span className="text-lg font-semibold text-foreground">
            NextJs Press
          </span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User Dropdown */}
        <UserDropdown />
      </nav>
    </header>
  );
}
