"use client";

import GradientASCII from "@/components/backgrounds/gradient-ascii";
import { useTheme } from "@/lib/theme";

// Poster gradient (violet → magenta → rose) rising into a light highlight.
const COLORS = ["#4e3aba", "#a24688", "#db4e66", "#f4f4f5"];
const MONO_FONT = 'ui-monospace, Menlo, "SF Mono", Consolas, monospace';

export function AuthBackground() {
  const theme = useTheme();

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 opacity-60">
      <GradientASCII dpr={1} colors={COLORS} fontFamily={MONO_FONT} lightMode={theme === "light"} />
    </div>
  );
}
