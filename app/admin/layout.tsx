"use client";
import SideNav from "@/app/ui/dashboard/sidenav";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex h-screen">
      <div
        className={`w-64 bg-gray-100 ${pathname.includes("admin/login") ? "hidden" : ""}`}
      >
        <SideNav />
      </div>
      <div className="flex-1 p-4 overflow-auto">{children}</div>
    </div>
  );
}
