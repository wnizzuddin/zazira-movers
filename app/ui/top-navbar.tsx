"use client";

import Link from "next/link";
import ZaziraLogo from "@/app/ui/zazira-logo";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function TopNavbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItemsClassName = `text-sm font-semibold transition-all duration-300 ${
    scrolled
      ? "text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-900"
      : "text-white hover:text-white/80 hover:border-b-2 hover:border-white"
  }`;

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <ZaziraLogo scrolled={scrolled} />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className={navItemsClassName}>
            Home
          </Link>
          <Link href="/services" className={navItemsClassName}>
            Services
          </Link>
          <Link href="/booking" className={navItemsClassName}>
            Booking
          </Link>
          {/* <Link href="/dashboard" className={navItemsClassName}>
            Dashboard
          </Link> */}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/admin/login"
            className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:bg-yellow-400 shadow-sm hover:shadow-md hidden md:inline-block"
          >
            Admin Login
          </Link>
          {/* <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600 transition-all duration-300 hover:bg-gray-200 cursor-pointer">
            U
          </div> */}
        </div>
      </div>
    </nav>
  );
}
