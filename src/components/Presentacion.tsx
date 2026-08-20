import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Asterisk,
  Mail,
  Quote,
} from "lucide-react";
import {
  FUNCTIONS,
  CUADRO,
  CATEGORY_META,
  QUIZ,
  fnById,
} from "../data/content";
import type { LoFunction } from "../data/content";
import { Formula, HiText, InstagramIcon } from "./shared";

/* ───────── helpers ───────── */

const acc = (cat: LoFunction["category"], dark: boolean) =>
  dark ? CATEGORY_META[cat].bright : CATEGORY_META[cat].hex;

const isDark = (f: LoFunction) => f.category === "pronombre";

/* ───────── slide shell ───────── */

function Slide({
  dark,
  num,
  overline,
  accent,
  children,
  tight = false,
}: {
  dark: boolean;
  num?: string;
  overline?: string;
  accent: string;
  children: React.ReactNode;
  tight?: boolean;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col justify-center px-6 py-16 sm:px-12 md:px-20 ${
        tight ? "py-10" : ""
      }`}
    >
      {(num || overline) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-3"
        >
          {num && (
            <span
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: accent }}
            >
              § {num}
            </span>
          )}
          {num && overline && (
            <span
              className={`h-px w-8 ${dark ? "bg-cream/25" : "bg-ink/25"}`}
            />
          )}
          {overline && (
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.26em] ${
                dark ? "text-cream/55" : "text-ink/55"
              }`}
            >
              {overline}
            </span>
          )}
        </motion.div>
      )}
      {children}
    </div>
  );
}

/* ───────── diapositiva de función ───────── */

function FunctionSlide({ f }: { f: LoFunction }) {
  const dark = isDark(f);
  const hex = acc(f.category, dark);
  return (
    <Slide dark={dark} num={f.code} overline={CATEGORY_META[f.category].label} accent={hex}>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className={`font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl ${
              dark ? "text-cream" : "text-ink"
            }`}
          >
            {f.name}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-4 font-display text-lg italic leading-snug md:text-2xl"
            style={{ color: hex }}
          >
            {f.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className={`mt-4 max-w-lg text-sm leading-relaxed md:text-base ${
              dark ? "text-cream/65" : "text-ink/65"
            }`}
          >
            {f.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6"
          >
            <Formula tokens={f.formula} hex={hex} dark={dark} />
          </motion.div>
        </div>

        <div className="space-y-4">
          {f.examples.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.12 }}
              className={`rounded-2xl border p-5 md:p-6 ${
                dark
                  ? "border-cream/15 bg-cream/[0.05]"
                  : "border-ink/15 bg-paper shadow-[0_18px_40px_-30px_rgba(25,20,16,0.4)]"
              }`}
            >
              <p className={`font-mono text-[9px] uppercase tracking-[0.25em]`} style={{ color: hex }}>
                <Quote size={11} className="mr-1.5 inline" />
                Ejemplo {i + 1}
              </p>
              <p
                className={`mt-3 font-display text-xl leading-snug md:text-3xl ${
                  dark ? "text-cream" : "text-ink"
                }`}
              >
                {ex.kind === "transform" ? (
                  <HiText text={ex.after.join("")} focus="lo" hex={hex} />
                ) : (
                  <HiText text={ex.text} focus={ex.focus} hex={hex} />
                )}
              </p>
              {ex.kind === "transform" ? (
                <p
                  className={`mt-3 font-mono text-[10px] leading-relaxed ${
                    dark ? "text-cream/50" : "text-ink/50"
                  }`}
                >
                  {ex.noteAfter}
                </p>
              ) : (
                ex.gloss && (
                  <p
                    className={`mt-3 font-mono text-[10px] leading-relaxed ${
                      dark ? "text-cream/50" : "text-ink/50"
                    }`}
                  >
                    {ex.gloss}
                  </p>
                )
              )}
            </motion.div>
          ))}
          {f.notes?.map((n) => (
            <p
              key={n}
              className={`flex items-start gap-2 font-mono text-[10px] leading-relaxed ${
                dark ? "text-cream/45" : "text-ink/45"
              }`}
            >
              <Asterisk size={12} className="mt-0.5 shrink-0" style={{ color: hex }} />
              {n}
            </p>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ───────── deck ───────── */

export default function Presentacion() {
  const [i, setI] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  const slides: { id: string; dark: boolean; node: React.ReactNode }[] = [
    /* 0 · portada */
    {
      id: "cover",
      dark: false,
      node: (
        <Slide dark={false} accent="#c2391e" >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-crimson"
          >
            Gramática del español · A2 – C1
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(2.6rem,9vw,7rem)] font-black leading-[1.02] tracking-tight"
          >
            La complejidad del <span className="italic text-crimson">«LO»</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg"
          >
            Guía gramatical y explicativa para estudiantes de español.
            Fundamentada en la <em className="font-display italic">Nueva gramática de la lengua española</em> (RAE y ASALE)
            y el <em className="font-display italic">Diccionario panhispánico de dudas</em>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid max-w-lg grid-cols-3 border-t border-ink/15"
          >
            {[
              { n: "2", l: "categorías" },
              { n: "7", l: "funciones" },
              { n: "0", l: "sustantivos neutros" },
            ].map((s, k) => (
              <div
                key={s.l}
                className={`flex flex-col gap-1 py-5 ${k > 0 ? "border-l border-ink/15 pl-5" : ""}`}
              >
                <span className="font-display text-4xl font-black">{s.n}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/55">
                  {s.l}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45"
          >
            Prof. Jonathan Mendoza ·{" "}
            <span className="text-crimson">@idiomaswebespanol</span>
          </motion.p>
        </Slide>
      ),
    },

    /* 1 · el problema */
    {
      id: "problema",
      dark: false,
      node: (
        <Slide dark={false} num="00" overline="El punto de partida" accent="#c2391e">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl font-display text-4xl font-black leading-[1.05] md:text-6xl"
          >
            El español no tiene sustantivos neutros.
            <span className="mt-2 block italic text-crimson">«Lo» los inventa en cada frase.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg"
          >
            Los demás pronombres y artículos varían según género y número. «Lo», no: desempeña
            funciones <strong className="font-semibold text-ink">neutras</strong> y de{" "}
            <strong className="font-semibold text-ink">complemento directo</strong>.
          </motion.p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { h: "Abstracción", b: "Convierte cualidades e ideas en conceptos: lo bueno, lo que dijiste.", c: "#c2391e" },
              { h: "Cohesión textual", b: "Retoma lo ya dicho sin repeticiones: lo vi, lo sabía, lo está.", c: "#0e5b4f" },
              { h: "Intensificación", b: "Gradúa cualidades: lo rápida que es, lo bien que canta.", c: "#9c6a0b" },
            ].map((p, k) => (
              <motion.div
                key={p.h}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 + k * 0.1 }}
                className="rounded-2xl border border-ink/15 bg-paper p-6 shadow-[0_18px_40px_-32px_rgba(25,20,16,0.5)]"
              >
                <span className="block h-10 w-10 rounded-xl" style={{ background: p.c }} />
                <h3 className="mt-5 font-display text-2xl font-bold">{p.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.b}</p>
              </motion.div>
            ))}
          </div>
        </Slide>
      ),
    },

    /* 2 · mapa general */
    {
      id: "mapa",
      dark: true,
      node: (
        <Slide dark num="00" overline="Mapa de la guía" accent="#e5b04c">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-black leading-tight text-cream md:text-5xl"
          >
            Dos categorías, siete funciones
          </motion.h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: "#54c7ab" }}>
                1 · Pronombre personal
              </p>
              <ul className="mt-4 space-y-3">
                {FUNCTIONS.filter((f) => f.category === "pronombre").map((f, k) => (
                  <motion.li
                    key={f.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + k * 0.08 }}
                    className="flex items-baseline gap-4 border-b border-cream/10 pb-3"
                  >
                    <span className="font-display text-xl font-black" style={{ color: "#54c7ab" }}>
                      {f.code}
                    </span>
                    <span className="text-cream/85">{f.name}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: "#ff7457" }}>
                2 · Artículo neutro
              </p>
              <ul className="mt-4 space-y-3">
                {FUNCTIONS.filter((f) => f.category !== "pronombre").map((f, k) => (
                  <motion.li
                    key={f.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + k * 0.08 }}
                    className="flex items-baseline gap-4 border-b border-cream/10 pb-3"
                  >
                    <span
                      className="font-display text-xl font-black"
                      style={{ color: f.category === "intensificador" ? "#e5b04c" : "#ff7457" }}
                    >
                      {f.code}
                    </span>
                    <span className="text-cream/85">{f.name}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Slide>
      ),
    },

    /* · separador §01 */
    {
      id: "sep1",
      dark: true,
      node: (
        <Slide dark accent="#54c7ab">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/50"
          >
            Sección 01
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[clamp(2.4rem,7vw,5.5rem)] font-black leading-[1.03] text-cream"
          >
            «Lo» como
            <br />
            <span className="italic" style={{ color: "#54c7ab" }}>
              pronombre
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-cream/60 md:text-lg"
          >
            Sustituye a un elemento previamente mencionado o comprendido por el
            contexto para evitar la repetición inútil.
          </motion.p>
        </Slide>
      ),
    },

    /* · funciones 1.A – 1.C */
    ...FUNCTIONS.filter((f) => f.category === "pronombre").map((f) => ({
      id: f.id,
      dark: true,
      node: <FunctionSlide f={f} />,
    })),

    /* · separador §02 */
    {
      id: "sep2",
      dark: false,
      node: (
        <Slide dark={false} accent="#c2391e">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/45"
          >
            Sección 02
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[clamp(2.4rem,7vw,5.5rem)] font-black leading-[1.03]"
          >
            «Lo» como
            <br />
            <span className="italic text-crimson">artículo neutro</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink/65 md:text-lg"
          >
            Nunca acompaña a un sustantivo directo: no existe «<em className="font-display italic">lo libro</em>».
            Su función es la <strong className="font-semibold text-ink">sustantivación</strong> y la intensificación.
          </motion.p>
        </Slide>
      ),
    },

    /* · funciones 2.A – 2.D */
    ...FUNCTIONS.filter((f) => f.category !== "pronombre").map((f) => ({
      id: f.id,
      dark: false,
      node: <FunctionSlide f={f} />,
    })),

    /* · cuadro comparativo */
    {
      id: "cuadro",
      dark: false,
      node: (
        <Slide dark={false} num="03" overline="Cuadro comparativo" accent="#c2391e" tight>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-black leading-tight md:text-5xl"
          >
            Las siete caras de <span className="italic text-crimson">«lo»</span>
          </motion.h2>
          <div className="mt-7 overflow-hidden rounded-2xl border border-ink/15">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-ink text-cream">
                  <th className="px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.2em]">Cód.</th>
                  <th className="px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.2em]">Nombre</th>
                  <th className="hidden px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.2em] md:table-cell">Estructura</th>
                  <th className="px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.2em]">Ejemplo</th>
                </tr>
              </thead>
              <tbody>
                {CUADRO.map((r, k) => {
                  const meta = CATEGORY_META[r.category];
                  const code = fnById(r.fid).code;
                  return (
                    <motion.tr
                      key={r.fid}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + k * 0.05 }}
                      className="border-t border-ink/10"
                    >
                      <td className="px-4 py-2.5 font-display text-base font-black" style={{ color: meta.hex }}>
                        {code}
                      </td>
                      <td className="px-4 py-2.5 text-[13px] text-ink/80">{r.name}</td>
                      <td className="hidden px-4 py-2.5 font-mono text-[11px] text-ink/60 md:table-cell">
                        {r.structure}
                      </td>
                      <td className="px-4 py-2.5 font-display text-sm italic md:text-base">
                        <HiText text={r.example} focus={r.focus} hex={meta.hex} />
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-mono text-[10px] leading-relaxed text-ink/45">
            * Solo en 2.D el adjetivo concuerda en género y número; en las demás, «lo» es invariable.
          </p>
        </Slide>
      ),
    },

    /* · diagnóstico */
    {
      id: "diagnostico",
      dark: true,
      node: (
        <Slide dark num="04" overline="Estrategia de diagnóstico" accent="#e5b04c">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-black leading-tight text-cream md:text-5xl"
          >
            ¿Qué <span className="italic text-goldbright">«lo»</span> es este{" "}
            <span className="italic text-goldbright">«lo»</span>?
          </motion.h2>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {[
              {
                n: "R1",
                q: "¿Reemplaza a una palabra u oración mencionada antes?",
                a: "→ es un PRONOMBRE",
                c: "#54c7ab",
              },
              {
                n: "R2",
                q: "¿Va seguido de adjetivo, de «que» o de «de» para abstractizar o intensificar?",
                a: "→ es un ARTÍCULO NEUTRO",
                c: "#ff7457",
              },
            ].map((r, k) => (
              <motion.div
                key={r.n}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + k * 0.12 }}
                className="rounded-2xl border border-cream/15 bg-cream/[0.05] p-7"
              >
                <span className="font-display text-4xl font-black text-cream/25">{r.n}</span>
                <p className="mt-4 font-display text-xl italic leading-snug text-cream md:text-2xl">
                  {r.q}
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: r.c }}>
                  {r.a}
                </p>
              </motion.div>
            ))}
          </div>
        </Slide>
      ),
    },

    /* · práctica */
    {
      id: "practica",
      dark: true,
      node: (
        <Slide dark num="05" overline="Práctica" accent="#54c7ab">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-black leading-tight text-cream md:text-5xl"
          >
            Identifica la función
          </motion.h2>
          <div className="mt-8 space-y-4">
            {QUIZ.slice(0, 4).map((q, k) => {
              const f = fnById(q.answer);
              const c = CATEGORY_META[f.category].bright;
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + k * 0.09 }}
                  className="rounded-xl border border-cream/15 bg-cream/[0.04] p-4 md:p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="font-display text-lg italic text-cream md:text-2xl">
                      <HiText text={q.sentence} focus={q.focus} hex="#e5b04c" />
                    </p>
                    <AnimatePresence>
                      {showAnswers && (
                        <motion.span
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                          style={{ borderColor: `${c}66`, color: c }}
                        >
                          {f.code} · {f.short}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {showAnswers && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="overflow-hidden pt-2 font-mono text-[10px] leading-relaxed text-cream/50"
                      >
                        {q.explanation}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            onClick={() => setShowAnswers((v) => !v)}
            className="mt-7 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-goldbright"
          >
            {showAnswers ? "Ocultar respuestas" : "Mostrar respuestas"}
          </motion.button>
        </Slide>
      ),
    },

    /* · cierre */
    {
      id: "cierre",
      dark: true,
      node: (
        <Slide dark accent="#e5b04c">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-goldbright"
          >
            Fundamentación académica
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-3xl font-display text-4xl font-black leading-[1.05] text-cream md:text-6xl"
          >
            «Lo» es pequeño.
            <span className="mt-1 block italic text-goldbright">Sus funciones, enormes.</span>
          </motion.h2>
          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="mt-9 space-y-3"
          >
            {[
              "Nueva gramática de la lengua española — RAE & ASALE, 2009",
              "Diccionario panhispánico de dudas, entrada «lo» — RAE & ASALE, 2005",
            ].map((s) => (
              <li key={s} className="font-display text-base italic text-cream/70 md:text-lg">
                {s}
              </li>
            ))}
          </motion.ul>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="https://instagram.com/idiomaswebespanol"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-cream/25 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-goldbright hover:text-goldbright"
            >
              <InstagramIcon size={16} />
              @idiomaswebespanol
            </a>
            <a
              href="mailto:idiomaswebespanol@gmail.com"
              className="inline-flex items-center gap-2.5 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-goldbright"
            >
              <Mail size={16} />
              idiomaswebespanol@gmail.com
            </a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-cream/40"
          >
            Prof. Jonathan Mendoza
          </motion.p>
        </Slide>
      ),
    },
  ];

  const total = slides.length;
  const cur = slides[i];
  const go = (d: number) => setI((v) => Math.min(total - 1, Math.max(0, v + d)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        go(1);
      } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") setI(0);
      else if (e.key === "End") setI(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  const dark = cur.dark;

  return (
    <div
      className={`relative h-screen w-full overflow-hidden transition-colors duration-700 ${
        dark ? "bg-ink text-cream" : "bg-paper text-ink"
      }`}
    >
      {/* watermark */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -bottom-10 right-[-2rem] select-none font-display text-[20rem] font-black italic leading-none md:text-[28rem] ${
          dark ? "txt-outline-cream" : "txt-outline-ink"
        }`}
      >
        lo
      </span>

      {/* slide */}
      <div className="relative z-10 h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.id}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -22 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            {cur.node}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* progress */}
      <div
        className={`absolute inset-x-0 top-0 z-20 h-[3px] ${dark ? "bg-cream/10" : "bg-ink/10"}`}
      >
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-viridian via-crimson to-goldbright"
          animate={{ scaleX: (i + 1) / total }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%" }}
        />
      </div>

      {/* controls */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-5 py-5 md:px-10">
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.24em] ${
            dark ? "text-cream/45" : "text-ink/45"
          }`}
        >
          {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <div className="hidden items-center gap-1.5 md:flex">
          {slides.map((s, k) => (
            <button
              key={s.id}
              onClick={() => setI(k)}
              aria-label={`Diapositiva ${k + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                k === i ? "w-7 bg-crimson" : dark ? "w-2 bg-cream/25 hover:bg-cream/50" : "w-2 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            disabled={i === 0}
            aria-label="Anterior"
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all disabled:opacity-30 ${
              dark ? "border-cream/25 text-cream hover:border-goldbright" : "border-ink/25 text-ink hover:border-crimson"
            }`}
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => go(1)}
            disabled={i === total - 1}
            aria-label="Siguiente"
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all disabled:opacity-30 ${
              dark ? "border-cream/25 text-cream hover:border-goldbright" : "border-ink/25 text-ink hover:border-crimson"
            }`}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* hint */}
      <span
        className={`pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.3em] lg:block ${
          dark ? "text-cream/20" : "text-ink/20"
        }`}
      >
        ← → para navegar
      </span>
    </div>
  );
}
