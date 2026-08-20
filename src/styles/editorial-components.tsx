/* ═══════════════════════════════════════════════════════════════════
   EDITORIAL CÁLIDO — Componentes React Reutilizables
   v1.0  ·  Jonathan Mendoza  ·  @idiomaswebespanol
   Importa junto con editorial.css
   ═══════════════════════════════════════════════════════════════════ */

import { motion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

/* ─────────────────────────────────────────────
   TIPOGRAFÍA Y ANIMACIÓN
   ───────────────────────────────────────────── */

/** Categoría semántica con color dual */
export interface Category {
  id: string;
  label: string;
  short: string;
  hex: string;
  bright: string;
}

/** Mapa rápido de categorías por id */
export type CategoryMap = Record<string, Category>;

/** Devuelve el color adecuado para el fondo */
export function catColor(cat: Category, dark: boolean): string {
  return dark ? cat.bright : cat.hex;
}

/* ────── Instagram glyph ────── */
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

/* ═══════════════════════════════════════════════════════════════════
   PRIMITIVAS — Reveal, Overline, SectionHead
   ═══════════════════════════════════════════════════════════════════ */

/* ────── Scroll reveal wrapper ────── */
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

/* ────── Overline (§ NN ─ etiqueta) ────── */
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
    <div className="overline-bar">
      <span className="overline-num" style={{ color: hex }}>
        § {num}
      </span>
      <span className={`overline-rule ${dark ? "bg-cream/25" : ""}`} aria-hidden />
      <span className={`overline-label ${dark ? "text-cream/60" : ""}`}>
        {text}
      </span>
    </div>
  );
}

/* ────── Section head con numeral fantasma ────── */
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
    <div className={`section-head ${dark ? "section-head-dark" : ""}`}>
      <span aria-hidden className="section-head-ghost">
        {num}
      </span>
      <Reveal>
        <Overline num={num} text={overline} hex={hex} dark={dark} />
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="section-head-title">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p className="section-head-lead">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FÓRMULA — Barra de tokens gramaticales
   ═══════════════════════════════════════════════════════════════════ */

export interface FormulaToken {
  /** Texto visible */
  t: string;
  /** Tipo visual: lo=sólido, slot=dashed, op=operador, txt=serif */
  k: "lo" | "slot" | "op" | "txt";
}

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
    <div className={`formula-bar ${dark ? "formula-bar-dark" : ""}`}>
      <span className={`formula-label ${dark ? "formula-label-dark" : ""}`}>
        Fórmula
      </span>
      {tokens.map((tk, i) => {
        if (tk.k === "lo")
          return (
            <span
              key={i}
              className="f-lo"
              style={{ background: hex, color: dark ? "#191410" : "#f5eedf" }}
            >
              {tk.t}
            </span>
          );
        if (tk.k === "slot")
          return (
            <span key={i} className={`f-slot ${dark ? "f-slot-dark" : ""}`}>
              {tk.t}
            </span>
          );
        if (tk.k === "op")
          return (
            <span key={i} className={`f-op ${dark ? "f-op-dark" : ""}`}>
              {tk.t}
            </span>
          );
        return (
          <span key={i} className={`f-txt ${dark ? "f-txt-dark" : ""}`}>
            {tk.t}
          </span>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CATEGORÍA — Chip con punto de color
   ═══════════════════════════════════════════════════════════════════ */

export function CategoryChip({
  cat,
  dark = false,
}: {
  cat: Category;
  dark?: boolean;
}) {
  const color = catColor(cat, dark);
  return (
    <span className="cat-chip" style={{ borderColor: `${color}55`, color }}>
      <span className="cat-chip-dot" style={{ background: color }} aria-hidden />
      {cat.label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HIGHLIGHT — Subrayado de substring con color semántico
   ═══════════════════════════════════════════════════════════════════ */

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
        className="hi-sub"
        style={{ color: hex, boxShadow: `inset 0 -0.42em 0 ${hex}2e` }}
      >
        {text.slice(i, i + focus.length)}
      </mark>
      {text.slice(i + focus.length)}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MARQUEE — Cinta tipográfica infinita
   ═══════════════════════════════════════════════════════════════════ */

export interface MarqueeItem {
  t: string;
  color?: string;
}

export function Marquee({
  items,
  dark = false,
  dur = 42,
}: {
  items: MarqueeItem[];
  dark?: boolean;
  dur?: number;
}) {
  const row = [...items, ...items, ...items];
  return (
    <div
      className={dark ? "marquee-dark" : "marquee-light"}
      aria-hidden
    >
      <div
        className="animate-marquee flex w-max whitespace-nowrap"
        style={{ "--marquee-dur": `${dur}s` } as CSSProperties}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {row.map((it, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span
                  className="font-display text-xl italic md:text-3xl"
                  style={{ color: it.color ?? (dark ? "#f2e9d6" : "#191410") }}
                >
                  {it.t}
                </span>
                <span
                  className={`mx-6 inline-block h-1.5 w-1.5 rotate-45 md:mx-8 ${
                    dark ? "bg-cream/30" : "bg-ink/30"
                  }`}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STAT STRIP — Banda de 3 métricas
   ═══════════════════════════════════════════════════════════════════ */

export function StatStrip({
  stats,
}: {
  stats: { n: string; label: string }[];
}) {
  return (
    <div className="stat-strip">
      {stats.map((s, i) => (
        <div key={i} className="stat-cell">
          <span className="stat-num">{s.n}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BOTONES — Variantes sólido / outline
   ═══════════════════════════════════════════════════════════════════ */

export function ButtonSolid({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`btn-solid ${className}`}>
      {children}
    </a>
  );
}

export function ButtonOutline({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`btn-outline ${className}`}>
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   OVERLAY — Film grain fijo sobre toda la app
   ═══════════════════════════════════════════════════════════════════ */

export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="bg-grain pointer-events-none fixed inset-0 z-[100] opacity-[0.05]"
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCROLL PROGRESS — Barra de progreso top
   ═══════════════════════════════════════════════════════════════════ */

export function ScrollProgress({ scale }: { scale: any }) {
  return (
    <motion.div className="scroll-progress" style={{ scaleX: scale }} />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   QUICK START — Copia esto en tu nuevo App.tsx
   ═══════════════════════════════════════════════════════════════════

   import "./styles/editorial.css";
   import {
     GrainOverlay, SectionHead, Reveal, StatStrip,
     Marquee, Formula, CategoryChip, HiText,
     ButtonSolid, ButtonOutline,
     ScrollProgress, InstagramIcon,
   } from "./styles/editorial-components";

   Categorías ejemplo:
     const CATS: CategoryMap = {
       A: { id: "a", label: "Categoría A", short: "Cat A",
            hex: "#0e5b4f", bright: "#54c7ab" },
       B: { id: "b", label: "Categoría B", short: "Cat B",
            hex: "#c2391e", bright: "#ff7457" },
       C: { id: "c", label: "Categoría C", short: "Cat C",
            hex: "#9c6a0b", bright: "#e5b04c" },
     };

   Google Fonts (en index.html):
     <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Space+Grotesk:wght@300..700&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />

   npm i framer-motion lucide-react clsx tailwind-merge

   ───────────────────────────────────────────── */
