export interface CountryTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  overlayGradient: string;
}

export const defaultTheme: CountryTheme = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  background: "bg-background",
  overlayGradient: "from-background/80 via-background/50 to-transparent",
};

export const countryThemes: Record<string, CountryTheme> = {
  germany: {
    primary: "#DD0000", // Red
    secondary: "#FFCC00", // Gold
    accent: "#000000", // Black
    // Stronger gradient, less transparency
    background: "bg-linear-to-br from-black via-[#DD0000]/40 to-[#FFCC00]/40", 
    overlayGradient: "from-black/90 via-black/70 to-transparent",
  },
  austria: {
    primary: "#EF3340", // Red
    secondary: "#FFFFFF", // White
    accent: "#EF3340", // Red
    // Stronger red, less white wash
    background: "bg-linear-to-br from-[#EF3340]/50 via-background to-[#EF3340]/30",
    overlayGradient: "from-[#EF3340]/40 via-background/80 to-transparent",
  },
  // Add more countries as needed
};

export function getCountryTheme(slug: string): CountryTheme {
  const normalizedSlug = slug.toLowerCase();
  // Check if the slug contains the country name (e.g., "visit-germany" matches "germany")
  const matchedKey = Object.keys(countryThemes).find((key) =>
    normalizedSlug.includes(key)
  );

  return matchedKey ? countryThemes[matchedKey] : defaultTheme;
}
