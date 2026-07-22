import Link from "next/link";

import { cn } from "@/lib/utils";
import { UserDropdown } from "./navbar/UserDropdown";
import { Button } from "../ui/button";

type IUser = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    activeStatus: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    profile: {
      id: string;
      profilePhoto: string;
      bio: string | null;
      userId: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type NavProps = {
  user: IUser;
};

export function Navbar({ user }: NavProps) {
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  console.log("user", user);
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
        {user.success ? (
          <UserDropdown user={user} />
        ) : (
          <Link href="/login">
            <Button className="cursor-pointer">Login</Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
