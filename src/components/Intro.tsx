import { Shapes, Link2, Gauge } from "lucide-react";
import { Reveal, Overline } from "./shared";

const PILLARS = [
  {
    icon: Shapes,
    n: "01",
    title: "Abstracción",
    body: "Convierte cualidades e ideas en conceptos nombrables: lo bueno, lo que, lo de ayer.",
    hex: "#c2391e",
  },
  {
    icon: Link2,
    n: "02",
    title: "Cohesión textual",
    body: "Retoma lo ya dicho y mantiene el hilo del discurso sin repeticiones: lo vi, lo sabía, lo está.",
    hex: "#0e5b4f",
  },
  {
    icon: Gauge,
    n: "03",
    title: "Intensificación",
    body: "Gradúa cualidades y acciones, midiendo su intensidad: lo rápida que es, lo bien que canta.",
    hex: "#9c6a0b",
  },
];

export default function Intro() {
  return (
    <section id="intro" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* statement */}
          <div className="lg:col-span-7">
            <Reveal>
              <Overline num="00" text="El punto de partida" hex="#c2391e" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                El español no tiene sustantivos neutros.
                <span className="mt-2 block italic text-crimson">
                  «Lo» lo inventa en cada frase.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">
                A diferencia de otros pronombres y artículos que varían según el
                género —masculino / femenino— y el número —singular / plural—,{" "}
                <strong className="font-semibold text-ink">«lo»</strong>{" "}
                desempeña funciones neutras y de complemento directo esenciales.
                Su uso representa uno de los aspectos más singulares del sistema
                gramatical español.
              </p>
            </Reveal>

            {/* contrast widget */}
            <Reveal delay={0.22}>
              <div className="mt-10 rounded-2xl border border-ink/15 bg-parch/60 p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-5">
                  <div>
                    <div className="flex gap-2">
                      {["el", "la", "los", "las"].map((a) => (
                        <span
                          key={a}
                          className="rounded-lg border border-dashed border-ink/30 px-3 py-1.5 font-display text-lg italic text-ink/60"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                      varían en género y número
                    </p>
                  </div>
                  <span className="font-mono text-xs text-ink/40">vs</span>
                  <div>
                    <span className="rounded-lg bg-crimson px-5 py-1.5 font-display text-2xl font-black italic text-paper shadow-[0_10px_24px_-10px_rgba(194,57,30,0.8)]">
                      lo
                    </span>
                    <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-crimson">
                      neutro · invariable
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* art */}
          <div className="lg:col-span-5">
            <Reveal delay={0.18} className="lg:sticky lg:top-28">
              <figure className="group relative">
                <div className="overflow-hidden rounded-2xl border border-ink/15 bg-cream p-3 shadow-[0_30px_60px_-30px_rgba(25,20,16,0.45)] transition-transform duration-700 group-hover:-rotate-1">
                  <img
                    src="/images/lo-collage.jpg"
                    alt="Collage modernista abstracto: la letra l y el círculo o en terracota, verde y ocre"
                    className="aspect-[4/5] w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">
                  <span>fig. 01 — «l» + «o», una geometría propia</span>
                  <span className="text-crimson">collage</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* pillars */}
        <div className="mt-20 grid gap-5 md:mt-28 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={0.1 * i}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-ink/15 bg-paper p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-30px_rgba(25,20,16,0.4)]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-8 -right-4 select-none font-display text-[7rem] font-black leading-none opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.12]"
                >
                  {p.n}
                </span>
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-paper"
                  style={{ background: p.hex }}
                >
                  <p.icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">
                  {p.body}
                </p>
                <span
                  className="mt-6 block h-0.5 w-10 transition-all duration-500 group-hover:w-20"
                  style={{ background: p.hex }}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
