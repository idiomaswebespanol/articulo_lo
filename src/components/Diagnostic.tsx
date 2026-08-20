import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, MoveRight, CornerDownRight, SearchCheck } from "lucide-react";
import { fnById, CATEGORY_META } from "../data/content";
import { Reveal, SectionHead, Formula, HiText } from "./shared";

type StepId = "q1" | "qP" | "qA";

interface Option {
  label: string;
  hint?: string;
  go?: StepId;
  fn?: string;
}

const STEPS: Record<StepId, { kicker: string; text: string; options: Option[] }> = {
  q1: {
    kicker: "Regla 1 — la prueba de sustitución",
    text: "¿«Lo» reemplaza a una palabra u oración mencionada antes?",
    options: [
      {
        label: "Sí — retoma algo ya dicho",
        hint: "entonces es un pronombre",
        go: "qP",
      },
      {
        label: "No — construye algo nuevo",
        hint: "entonces es artículo o intensificador",
        go: "qA",
      },
    ],
  },
  qP: {
    kicker: "Regla 1.1 — ¿qué sustituye?",
    text: "¿Qué tipo de elemento está sustituyendo?",
    options: [
      { label: "Un sustantivo masculino singular", fn: "cd-masc", hint: "«el libro», «a Carlos»…" },
      { label: "Una oración o idea completa", fn: "cd-neutro", hint: "«que mañana no hay clase»…" },
      { label: "Un atributo, con ser / estar / parecer", fn: "atributo", hint: "cansada, médicos, listos…" },
    ],
  },
  qA: {
    kicker: "Regla 2 — la prueba del contexto",
    text: "¿Qué encontramos justo después de «lo»?",
    options: [
      { label: "Un adjetivo que se vuelve concepto", fn: "lo-adj", hint: "lo bueno, lo difícil…" },
      { label: "La palabra «que»", fn: "lo-que", hint: "lo que dijiste…" },
      { label: "La preposición «de»", fn: "lo-de", hint: "lo de ayer, lo de Juan…" },
      { label: "Adjetivo o adverbio + «que»", fn: "intensif", hint: "lo rápida que es…" },
    ],
  },
};

export default function Diagnostic() {
  const [step, setStep] = useState<StepId>("q1");
  const [crumbs, setCrumbs] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const choose = (o: Option) => {
    if (o.fn) {
      setResult(o.fn);
      setCrumbs((c) => [...c, o.label]);
    } else if (o.go) {
      setCrumbs((c) => [...c, o.label]);
      setStep(o.go);
    }
  };

  const reset = () => {
    setStep("q1");
    setCrumbs([]);
    setResult(null);
  };

  const fn = result ? fnById(result) : null;
  const meta = fn ? CATEGORY_META[fn.category] : null;

  return (
    <section id="diagnostico" className="relative bg-ink py-24 text-cream md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHead
          num="04"
          overline="Estrategia de diagnóstico"
          hex="#e5b04c"
          dark
          title={
            <>
              ¿Qué <span className="italic text-goldbright">«lo»</span> es este{" "}
              <span className="italic text-goldbright">«lo»</span>?
            </>
          }
          lead="Dos preguntas bastan para identificarlo. Recorre el árbol de decisión y obtén la función exacta, con su fórmula y su ejemplo."
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* rules panel */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="rounded-2xl border border-cream/15 bg-cream/[0.04] p-7">
                <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-goldbright">
                  <SearchCheck size={14} />
                  Las dos reglas de oro
                </p>
                <ol className="mt-7 space-y-8">
                  <li className="flex gap-5">
                    <span className="font-display text-4xl font-black text-cream/25">R1</span>
                    <div>
                      <p className="font-display text-xl italic leading-snug text-cream">
                        ¿Reemplaza a una palabra u oración mencionada antes?
                      </p>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-viridian" style={{ color: "#54c7ab" }}>
                        → es un Pronombre
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-5">
                    <span className="font-display text-4xl font-black text-cream/25">R2</span>
                    <div>
                      <p className="font-display text-xl italic leading-snug text-cream">
                        ¿Va seguido de adjetivo, de «que» o de «de» para abstractizar o intensificar?
                      </p>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "#ff7457" }}>
                        → es un Artículo neutro
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 font-mono text-[11px] leading-relaxed text-cream/45">
                Estrategia práctica basada en el cuadro comparativo: primero
                descarta la sustitución; después, observa el contexto inmediato.
              </p>
            </Reveal>
          </div>

          {/* interactive tree */}
          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <div className="relative min-h-[26rem] overflow-hidden rounded-2xl border border-cream/15 bg-soot p-6 md:p-9">
                {/* crumbs */}
                <div className="mb-7 flex min-h-[1.75rem] flex-wrap items-center gap-2">
                  {crumbs.map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-full bg-cream/[0.07] px-3 py-1 font-mono text-[10px] text-cream/60"
                    >
                      <CornerDownRight size={10} className="text-goldbright" />
                      {c}
                    </span>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {!fn ? (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 36 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -36 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-goldbright">
                        {STEPS[step].kicker}
                      </p>
                      <h3 className="mt-4 max-w-lg font-display text-2xl font-black leading-tight md:text-4xl">
                        {STEPS[step].text}
                      </h3>
                      <div className="mt-8 space-y-3">
                        {STEPS[step].options.map((o) => (
                          <button
                            key={o.label}
                            onClick={() => choose(o)}
                            className="group flex w-full items-center justify-between gap-4 rounded-xl border border-cream/15 bg-cream/[0.03] px-5 py-4 text-left transition-all duration-300 hover:border-goldbright/60 hover:bg-cream/[0.07]"
                          >
                            <span>
                              <span className="block text-sm font-semibold text-cream md:text-base">
                                {o.label}
                              </span>
                              {o.hint && (
                                <span className="mt-1 block font-mono text-[10px] text-cream/45">
                                  {o.hint}
                                </span>
                              )}
                            </span>
                            <MoveRight
                              size={17}
                              className="shrink-0 text-cream/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-goldbright"
                            />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.96, y: 16 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-goldbright">
                        Diagnóstico completo
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-4">
                        <span
                          className="font-display text-6xl font-black leading-none"
                          style={{ color: meta!.bright }}
                        >
                          {fn.code}
                        </span>
                        <div>
                          <h3 className="font-display text-2xl font-black md:text-3xl">
                            {fn.name}
                          </h3>
                          <p
                            className="font-mono text-[10px] uppercase tracking-[0.22em]"
                            style={{ color: meta!.bright }}
                          >
                            {meta!.label}
                          </p>
                        </div>
                      </div>
                      <p className="mt-5 max-w-lg text-sm leading-relaxed text-cream/70 md:text-base">
                        {fn.description}
                      </p>
                      <div className="mt-6">
                        <Formula tokens={fn.formula} hex={meta!.bright} dark />
                      </div>
                      <p className="mt-6 font-display text-xl italic leading-snug text-cream md:text-2xl">
                        <HiText
                          text={
                            fn.examples[0].kind === "transform"
                              ? fn.examples[0].after.join("")
                              : fn.examples[0].text
                          }
                          focus={fn.examples[0].kind === "transform" ? "lo" : fn.examples[0].focus}
                          hex={meta!.bright}
                        />
                      </p>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <button
                          onClick={reset}
                          className="inline-flex items-center gap-2.5 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-goldbright"
                        >
                          <RotateCcw size={15} />
                          Analizar otro «lo»
                        </button>
                        <a
                          href="#cuadro"
                          className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-goldbright hover:text-goldbright"
                        >
                          Ver en el cuadro
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
