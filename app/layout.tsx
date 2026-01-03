import "@/app/ui/global.css";
import TopNavbar from "@/app/ui/top-navbar";
import { BackgroundProvider } from "@/app/ui/background-provider";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Zazira Movers",
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BackgroundProvider>
          <TopNavbar />
          {children}
        </BackgroundProvider>
      </body>
    </html>
  );
}
