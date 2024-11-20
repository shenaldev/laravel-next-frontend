"use client";

import Link from "next/link";
import { LaptopIcon, LogIn, UserPlus } from "lucide-react";
import useAuth from "@/hooks/use-auth";
import { authUrls } from "@/lib/api-urls";
import { cn } from "@/lib/utils";
import { useAuthProvider } from "../providers/auth-provider";
import { Button } from "../ui/button";
import MobileNav from "./mobile-header";
import NavLinks from "./nav-links";

type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  const classes = cn("w-full border-b bg-slate-50 shadow-sm", className);

  return (
    <header className={classes}>
      <div className="container grid h-16 grid-cols-[3fr_6fr_3fr] items-center">
        <div className="flex items-center gap-4">
          <LaptopIcon className="size-6" />
          <h2 className="text-lg font-medium text-slate-900">
            Next-Laravel Starter
          </h2>
        </div>
        <nav className="ml-12 hidden lg:block" aria-label="Shenal Dev">
          <ul className="flex gap-6" role="menubar">
            <NavLinks />
          </ul>
        </nav>
        <div className="flex gap-4 justify-self-end">
          <AuthLinks />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

const AuthLinks = () => {
  const { user } = useAuthProvider();
  const { logout } = useAuth();

  if (user) {
    return (
      <>
        <Button asChild size="sm" className="hidden md:flex">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button
          size="sm"
          className="hidden md:flex"
          onClick={() => {
            logout(authUrls.logout);
          }}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <>
      <Button asChild variant="outline" size="sm" className="hidden md:flex">
        <Link href="/auth/login">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Link>
      </Button>
      <Button asChild size="sm" className="hidden md:flex">
        <Link href="/auth/register">
          <UserPlus className="mr-2 h-4 w-4" />
          Sign up
        </Link>
      </Button>
    </>
  );
};
