import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { CategoryId, FormulaToken } from "../data/content";
import { CATEGORY_META } from "../data/content";

/* ---------- instagram glyph (lucide no longer ships brand icons) ---------- */
export function InstagramIcon({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* ---------- scroll reveal wrapper ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- small mono overline ---------- */
export function Overline({
  num,
  text,
  hex,
  dark = false,
}: {
  num: string;
  text: string;
  hex: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="font-mono text-[11px] font-semibold tracking-[0.3em] uppercase"
        style={{ color: hex }}
      >
        § {num}
      </span>
      <span
        className={`h-px w-10 ${dark ? "bg-cream/25" : "bg-ink/25"}`}
        aria-hidden
      />
      <span
        className={`font-mono text-[11px] tracking-[0.3em] uppercase ${
          dark ? "text-cream/60" : "text-ink/60"
        }`}
      >
        {text}
      </span>
    </div>
  );
}

/* ---------- section head with ghost numeral ---------- */
export function SectionHead({
  num,
  overline,
  title,
  lead,
  hex,
  dark = false,
}: {
  num: string;
  overline: string;
  title: ReactNode;
  lead?: string;
  hex: string;
  dark?: boolean;
}) {
  return (
    <div className="relative mb-14 md:mb-20">
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-14 right-0 hidden select-none font-display text-[11rem] font-black leading-none md:block ${
          dark ? "txt-outline-cream" : "txt-outline-ink"
        }`}
      >
        {num}
      </span>
      <Reveal>
        <Overline num={num} text={overline} hex={hex} dark={dark} />
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-6 max-w-3xl font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl ${
            dark ? "text-cream" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p
            className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${
              dark ? "text-cream/65" : "text-ink/65"
            }`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- substring highlighter ---------- */
export function HiText({
  text,
  focus,
  hex,
}: {
  text: string;
  focus: string;
  hex: string;
}) {
  const i = text.toLowerCase().indexOf(focus.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark
        className="bg-transparent font-bold"
        style={{ color: hex, boxShadow: `inset 0 -0.42em 0 ${hex}2e` }}
      >
        {text.slice(i, i + focus.length)}
      </mark>
      {text.slice(i + focus.length)}
    </>
  );
}

/* ---------- grammar formula bar ---------- */
export function Formula({
  tokens,
  hex,
  dark = false,
}: {
  tokens: FormulaToken[];
  hex: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-2.5 gap-y-2 rounded-xl border px-4 py-3 ${
        dark ? "border-cream/15 bg-cream/[0.04]" : "border-ink/15 bg-ink/[0.03]"
      }`}
    >
      <span
        className={`mr-1 font-mono text-[10px] uppercase tracking-[0.25em] ${
          dark ? "text-cream/40" : "text-ink/40"
        }`}
      >
        Fórmula
      </span>
      {tokens.map((tk, i) => {
        if (tk.k === "lo")
          return (
            <span
              key={i}
              className="rounded-md px-2 py-0.5 font-display text-lg font-black italic leading-tight"
              style={{ background: hex, color: dark ? "#191410" : "#f5eedf" }}
            >
              {tk.t}
            </span>
          );
        if (tk.k === "slot")
          return (
            <span
              key={i}
              className={`rounded-md border border-dashed px-2 py-0.5 font-mono text-xs md:text-sm ${
                dark ? "border-cream/35 text-cream/80" : "border-ink/35 text-ink/80"
              }`}
            >
              {tk.t}
            </span>
          );
        if (tk.k === "op")
          return (
            <span
              key={i}
              className={`font-mono text-sm ${dark ? "text-cream/40" : "text-ink/40"}`}
            >
              {tk.t}
            </span>
          );
        return (
          <span
            key={i}
            className={`font-display italic ${dark ? "text-cream/85" : "text-ink/85"}`}
          >
            {tk.t}
          </span>
        );
      })}
    </div>
  );
}

/* ---------- category chip ---------- */
export function CategoryChip({
  cat,
  dark = false,
}: {
  cat: CategoryId;
  dark?: boolean;
}) {
  const meta = CATEGORY_META[cat];
  const color = dark ? meta.bright : meta.hex;
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em]"
      style={{ borderColor: `${color}55`, color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: color }}
        aria-hidden
      />
      {meta.label}
    </span>
  );
}
