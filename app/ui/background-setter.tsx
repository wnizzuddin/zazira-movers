"use client";

import { useEffect } from "react";
import { useBackground } from "./background-provider";

export default function BackgroundSetter({ src }: { src: string }) {
  const { setSrc } = useBackground();

  useEffect(() => {
    setSrc(src);
    return () => setSrc(null);
  }, [src, setSrc]);

  return null;
}
