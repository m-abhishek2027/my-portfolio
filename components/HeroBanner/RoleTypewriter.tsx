"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1600;

/**
 * Types each role out, holds it, deletes it, then moves to the next one.
 * Users who prefer reduced motion just see the first role, static.
 */
export default function RoleTypewriter({ roles }: { roles: string[] }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion || roles.length === 0) return undefined;
    const full = roles[roleIdx % roles.length];

    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (!deleting && text === full) delay = HOLD_MS;

    const timer = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setRoleIdx((idx) => (idx + 1) % roles.length);
      } else {
        setText(full.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, roleIdx, roles, reduceMotion]);

  const shown = reduceMotion ? roles[0] ?? "" : text;

  return (
    <span>
      {/* Screen readers get the full list once instead of every keystroke. */}
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden className="text-gradient-gold">
        {shown}
      </span>
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-caret bg-gold motion-reduce:animate-none"
      />
    </span>
  );
}
