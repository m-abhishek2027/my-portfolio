"use client";

import { useEffect, useRef, useState } from "react";

interface SkillRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger this block's entrance behind others in the same group. */
  delayMs?: number;
}

/**
 * Fades + slides its children up into place the moment they scroll into
 * view (once — it disconnects after the first reveal). Plain CSS transitions
 * driven by one boolean, so it costs nothing until the section is actually
 * near the viewport. Used to make the Skills page's categories and logo
 * cards animate in as you scroll, instead of all firing at once on load.
 */
export default function SkillReveal({ children, className, delayMs = 0 }: SkillRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
