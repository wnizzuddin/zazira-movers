"use client";

import Link from "next/link";
import AcmeLogo from "@/app/ui/acme-logo";
import { useEffect, useState } from "react";

export default function TopNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItemsClassName = `text-sm font-bold ${
    scrolled
      ? "text-gray-600 hover:text-gray-900"
      : "text-white hover:text-white-900"
  }`;

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled ? "bg-white shadow" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <AcmeLogo scrolled={scrolled} />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className={navItemsClassName}>
            Home
          </Link>
          <Link href="/services" className={navItemsClassName}>
            Services
          </Link>
          <Link href="/booking" className={navItemsClassName}>
            Booking
          </Link>
        </div>

        {/* <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-400 md:inline-block"
          >
            Log in
          </Link>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm text-gray-600">
            U
          </div>
        </div> */}
      </div>
    </nav>
  );
}
