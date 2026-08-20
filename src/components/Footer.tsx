import { BookOpen, GraduationCap, ArrowUp, Mail } from "lucide-react";
import { Reveal, InstagramIcon } from "./shared";

const SOURCES = [
  {
    title: "Nueva gramática de la lengua española",
    meta: "Real Academia Española & ASALE · 2009",
  },
  {
    title: 'Diccionario panhispánico de dudas, entrada «lo»',
    meta: "Real Academia Española & ASALE · 2005",
  },
];

const TRAIL = [
  { href: "#pronombre", label: "§01 El pronombre" },
  { href: "#articulo", label: "§02 El artículo neutro" },
  { href: "#cuadro", label: "§03 Cuadro comparativo" },
  { href: "#diagnostico", label: "§04 Diagnóstico" },
  { href: "#practica", label: "§05 Práctica" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pb-14 pt-24 text-cream md:pt-32">
      {/* watermark */}
      <span
        aria-hidden
        className="txt-outline-cream pointer-events-none absolute -bottom-24 right-0 select-none font-display text-[26rem] font-black italic leading-none opacity-60"
      >
        lo
      </span>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        {/* professor band */}
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-8 rounded-3xl border border-cream/15 bg-cream/[0.04] p-8 md:flex-row md:items-center md:p-10">
            <div className="flex items-center gap-5 md:gap-6">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-crimson font-display text-2xl font-black italic text-paper shadow-[0_16px_30px_-12px_rgba(194,57,30,0.7)] md:h-20 md:w-20 md:text-3xl">
                JM
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-goldbright">
                  Tu profesor
                </p>
                <h3 className="mt-1.5 font-display text-2xl font-black tracking-tight md:text-3xl">
                  Jonathan Mendoza
                </h3>
                <p className="mt-1 text-sm text-cream/60">
                  Profesor de español · creador de esta guía
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://instagram.com/idiomaswebespanol"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-6 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:border-goldbright hover:text-goldbright"
              >
                <InstagramIcon size={16} className="transition-transform duration-300 group-hover:-rotate-12" />
                @idiomaswebespanol
              </a>
              <a
                href="mailto:idiomaswebespanol@gmail.com"
                className="inline-flex items-center gap-2.5 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-goldbright"
              >
                <Mail size={16} />
                idiomaswebespanol@gmail.com
              </a>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-goldbright">
                <GraduationCap size={15} />
                Fundamentación académica
              </p>
              <h2 className="mt-6 font-display text-3xl font-black leading-tight md:text-4xl">
                Gramática del español — guía de estudio interactiva
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/60 md:text-base">
                Contenido elaborado a partir de los criterios teóricos de la
                tradición académica hispánica, para estudiantes de niveles{" "}
                <span className="text-goldbright">A2 — C1</span>.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <Reveal delay={0.08}>
              <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-cream/50">
                <BookOpen size={14} />
                Fuentes
              </p>
              <ul className="mt-6 space-y-5">
                {SOURCES.map((s) => (
                  <li key={s.title} className="border-b border-cream/10 pb-5">
                    <p className="font-display text-lg italic leading-snug">
                      {s.title}
                    </p>
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/45">
                      {s.meta}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={0.14}>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/50">
                Recorrido
              </p>
              <ul className="mt-6 space-y-3">
                {TRAIL.map((t) => (
                  <li key={t.href}>
                    <a
                      href={t.href}
                      className="group inline-flex items-center gap-2 font-mono text-xs text-cream/70 transition-colors hover:text-goldbright"
                    >
                      <span className="h-px w-4 bg-cream/25 transition-all duration-300 group-hover:w-7 group-hover:bg-goldbright" />
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
            © 2026 Jonathan Mendoza · «lo» — del latín <em>illud</em>, ya neutro desde el origen
          </p>
          <a
            href="#inicio"
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/50 transition-colors hover:text-goldbright"
          >
            Volver arriba
            <ArrowUp size={13} className="transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}
