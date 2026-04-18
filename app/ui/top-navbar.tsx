"use client";

import Link from "next/link";
import ZaziraLogo from "@/app/ui/zazira-logo";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function TopNavbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItemsClassName = `text-sm font-semibold transition-all duration-300 ${
    scrolled
      ? "text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-900"
      : "text-white hover:text-white/80 hover:border-b-2 hover:border-white"
  }`;

  const mobileLinkClassName = `block rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
    scrolled
      ? "text-gray-700 hover:bg-gray-100"
      : "text-gray-900 hover:bg-gray-100"
  }`;

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={`mr-1 inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:hidden ${
              scrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-nav-drawer"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              {mobileOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <ZaziraLogo scrolled={scrolled} />
          </Link>
        </div>

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

      {/* Mobile drawer (phone only) */}
      <div className={`md:hidden ${mobileOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        <aside
          id="mobile-nav-drawer"
          className={`fixed left-0 top-0 z-50 h-dvh w-[280px] transform bg-white shadow-xl transition-transform duration-200 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={() => setMobileOpen(false)}
            >
              <ZaziraLogo scrolled />
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-2 py-3">
            <Link
              href="/"
              className={mobileLinkClassName}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={mobileLinkClassName}
              onClick={() => setMobileOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/booking"
              className={mobileLinkClassName}
              onClick={() => setMobileOpen(false)}
            >
              Booking
            </Link>
          </div>

          <div className="mt-auto px-4 py-4 border-t border-gray-100">
            <Link
              href="/admin/login"
              className="inline-flex w-full items-center justify-center rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-yellow-400"
              onClick={() => setMobileOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        </aside>
      </div>
    </nav>
  );
}
