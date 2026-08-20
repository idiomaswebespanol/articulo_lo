import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, MoveRight } from "lucide-react";
import { CATEGORY_META } from "../data/content";
import type { CategoryId } from "../data/content";

const FRAGS: { w: string; cat: CategoryId }[] = [
  { w: "bueno.", cat: "articulo" },
  { w: "vi.", cat: "pronombre" },
  { w: "que dijiste.", cat: "articulo" },
  { w: "está.", cat: "pronombre" },
  { w: "de ayer.", cat: "articulo" },
  { w: "altas que son.", cat: "intensificador" },
  { w: "sabía.", cat: "pronombre" },
];

const CHIPS: {
  txt: string;
  cat: CategoryId;
  pos: string;
  rot: string;
  delay: string;
}[] = [
  {
    txt: "lo + verbo → sustituye",
    cat: "pronombre",
    pos: "right-[5%] top-[24%]",
    rot: "-4deg",
    delay: "0s",
  },
  {
    txt: "lo + adjetivo → abstrae",
    cat: "articulo",
    pos: "right-[14%] bottom-[26%]",
    rot: "3deg",
    delay: "1.4s",
  },
  {
    txt: "lo + adj + que → intensifica",
    cat: "intensificador",
    pos: "left-[3%] top-[58%]",
    rot: "-2deg",
    delay: "2.6s",
  },
];

const STATS = [
  { n: "2", l: "categorías nucleares" },
  { n: "7", l: "funciones gramaticales" },
  { n: "0", l: "sustantivos neutros" },
];

export default function Hero() {
  const [fi, setFi] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setFi((v) => (v + 1) % FRAGS.length), 2300);
    return () => clearInterval(t);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBig = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const fragColor = CATEGORY_META[FRAGS[fi].cat].hex;

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24"
    >
      {/* column hairlines */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[20, 40, 60, 80].map((x) => (
          <span
            key={x}
            className="absolute inset-y-0 w-px bg-ink/[0.05]"
            style={{ left: `${x}%` }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(194,57,30,0.09),transparent_60%)]" />
      </div>

      {/* floating grammar chips */}
      {CHIPS.map((c) => (
        <motion.div
          key={c.txt}
          style={{ opacity }}
          className={`absolute z-10 hidden lg:block ${c.pos}`}
        >
          <div
            className="animate-floaty flex items-center gap-2.5 rounded-full border bg-paper/80 py-2 pl-3 pr-4 shadow-[0_14px_30px_-18px_rgba(25,20,16,0.5)] backdrop-blur"
            style={{ borderColor: `${CATEGORY_META[c.cat].hex}44`, animationDelay: c.delay, "--rot": c.rot } as CSSProperties}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: CATEGORY_META[c.cat].hex }}
            />
            <span className="font-mono text-[11px] tracking-wide text-ink/75">
              {c.txt}
            </span>
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-8">
        {/* overline */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-ink px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-paper">
              Guía gramatical interactiva
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-ink/50 sm:block">
              Niveles A2 → C1
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/50">
            NGLE · RAE — ASALE · DPD
          </span>
        </motion.div>

        {/* kinetic headline */}
        <motion.h1
          style={{ y: yBig, fontSize: "clamp(3.4rem, 11.5vw, 10.5rem)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative font-display font-black leading-[1.02] tracking-tight text-ink"
        >
          <span className="italic">lo</span>{" "}
          <AnimatePresence mode="popLayout">
            <motion.span
              key={fi}
              initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -34, filter: "blur(10px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
              style={{ color: fragColor }}
            >
              {FRAGS[fi].w}
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        {/* live category tag */}
        <div className="mt-4 flex h-6 items-center gap-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={fi}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em]"
              style={{ color: fragColor }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: fragColor }}
              />
              {CATEGORY_META[FRAGS[fi].cat].label}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* sub + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <p className="max-w-xl text-lg leading-relaxed text-ink/70 md:text-xl">
            La palabra más pequeña con las funciones más grandes del español:{" "}
            <em className="font-display text-viridian">pronombre</em>,{" "}
            <em className="font-display text-crimson">artículo neutro</em> e{" "}
            <em className="font-display text-gold">intensificador</em>. Una guía
            para ver lo invisible.
          </p>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#pronombre"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-crimson"
              >
                Explorar la guía
                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </a>
              <a
                href="#diagnostico"
                className="group inline-flex items-center gap-3 rounded-full border border-ink/25 px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:border-crimson hover:text-crimson"
              >
                Diagnosticar un «lo»
                <MoveRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45 md:text-right">
              Una guía del{" "}
              <span className="text-ink/75">prof. Jonathan Mendoza</span> ·{" "}
              <a
                href="https://instagram.com/idiomaswebespanol"
                target="_blank"
                rel="noreferrer"
                className="text-crimson transition-colors hover:text-ink"
              >
                @idiomaswebespanol
              </a>
            </p>
          </div>
        </motion.div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 grid grid-cols-3 border-t border-ink/15 md:mt-20"
        >
          {STATS.map((s, i) => (
            <div
              key={s.l}
              className={`flex flex-col gap-1 py-6 pr-4 md:py-8 ${
                i > 0 ? "border-l border-ink/15 pl-5 md:pl-8" : ""
              }`}
            >
              <span className="font-display text-4xl font-black md:text-6xl">
                {s.n}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/55 md:text-[11px]">
                {s.l}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        style={{ opacity }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/45">
          desliza
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-ink/30 p-1">
          <span className="animate-cuedot h-1.5 w-1.5 rounded-full bg-crimson" />
        </span>
      </motion.div>
    </section>
  );
}
