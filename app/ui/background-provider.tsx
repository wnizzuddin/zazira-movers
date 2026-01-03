"use client";

import Image from "next/image";
import React, { createContext, useContext, useState } from "react";

type BgContext = {
  src: string | null;
  setSrc: (s: string | null) => void;
};

const BackgroundContext = createContext<BgContext | undefined>(undefined);

export function BackgroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [src, setSrc] = useState<string | null>("");
  return (
    <BackgroundContext.Provider value={{ src, setSrc }}>
      <div className="relative min-h-screen">
        {src && (
          <>
            <div className="absolute inset-x-0 top-0 h-screen -z-10 pointer-events-none">
              <Image
                src={src}
                alt="Background"
                fill
                className="hidden md:block object-cover"
              />
            </div>
            <div className="absolute inset-0 top-0 h-screen -z-10 bg-black/60" />
          </>
        )}
        {children}
      </div>
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const ctx = useContext(BackgroundContext);
  if (!ctx)
    throw new Error("useBackground must be used within BackgroundProvider");
  return ctx;
}
