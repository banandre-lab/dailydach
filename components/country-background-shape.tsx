"use client";

import { getCountryShape } from "@/lib/country-shapes";
import { useEffect, useState } from "react";

interface CountryBackgroundShapeProps {
  slug: string;
  color?: string;
}

export function CountryBackgroundShape({ slug, color = "currentColor" }: CountryBackgroundShapeProps) {
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    setPath(getCountryShape(slug));
  }, [slug]);

  if (!path) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div 
        className="absolute -top-[50%] -left-[20%] w-[180%] md:w-[140%] md:-top-[60%] md:-left-[10%] opacity-20"
        style={{ color }}
      >
        <svg
          viewBox="0 0 1000 684"
          className="w-full h-full fill-current"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d={path} />
        </svg>
      </div>
    </div>
  );
}
