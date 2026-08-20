import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { InstagramIcon } from "./shared";

const LINKS = [
  { href: "#pronombre", label: "El pronombre" },
  { href: "#articulo", label: "El artículo" },
  { href: "#cuadro", label: "Cuadro" },
  { href: "#diagnostico", label: "Diagnóstico" },
  { href: "#practica", label: "Práctica" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 28));

  return (
    <>
      {/* progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-viridian via-crimson to-goldbright"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          scrolled
            ? "border-b border-ink/10 bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-8">
          <a href="#inicio" className="group flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-crimson font-display text-lg font-black italic text-paper shadow-[0_6px_18px_-6px_rgba(194,57,30,0.7)] transition-transform duration-300 group-hover:-rotate-6">
              lo
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-sm font-bold tracking-tight">
                La complejidad del «LO»
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-ink/50">
                gramática del español
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-[13px] font-medium text-ink/70 transition-colors hover:bg-ink/[0.05] hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://instagram.com/idiomaswebespanol"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram @idiomaswebespanol"
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink/60 transition-all hover:border-crimson hover:text-crimson"
            >
              <InstagramIcon size={15} />
            </a>
            <span className="ml-3 rounded-full border border-ink/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">
              A2 — C1
            </span>
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
            aria-label="Abrir menú"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex flex-col bg-ink text-cream"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-crimson font-display text-lg font-black italic text-paper">
                lo
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25"
                aria-label="Cerrar menú"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {[{ href: "#inicio", label: "Inicio" }, ...LINKS].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-baseline gap-4 border-b border-cream/10 py-4"
                >
                  <span className="font-mono text-xs text-crimson">0{i}</span>
                  <span className="font-display text-4xl font-black tracking-tight transition-colors group-hover:text-goldbright">
                    {l.label}
                  </span>
                </motion.a>
              ))}
            </nav>
            <p className="px-8 pb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40">
              RAE · ASALE · DPD — niveles A2 → C1
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
