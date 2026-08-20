import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  ArrowRight,
  RotateCcw,
  Award,
  ListChecks,
} from "lucide-react";
import {
  QUIZ,
  FUNCTIONS,
  CATEGORY_META,
  fnById,
  levelFor,
} from "../data/content";
import type { CategoryId } from "../data/content";
import { Reveal, SectionHead, HiText } from "./shared";

const CATS: CategoryId[] = ["pronombre", "articulo", "intensificador"];

export default function Quiz() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ qid: number; ok: boolean }[]>([]);
  const [done, setDone] = useState(false);

  const q = QUIZ[idx];
  const score = useMemo(() => answers.filter((a) => a.ok).length, [answers]);

  const pick = (fid: string) => {
    if (picked) return;
    setPicked(fid);
    setAnswers((a) => [...a, { qid: q.id, ok: fid === q.answer }]);
  };

  const next = () => {
    if (idx + 1 >= QUIZ.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setAnswers([]);
    setDone(false);
  };

  /* ---------------- results screen ---------------- */
  if (done) {
    const { level, msg } = levelFor(score, QUIZ.length);
    const C = 2 * Math.PI * 54;
    return (
      <section id="practica" className="relative py-24 md:py-36">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-ink p-8 text-cream md:p-14">
              <div className="grid items-center gap-10 md:grid-cols-2">
                <div className="flex flex-col items-center">
                  <div className="relative h-44 w-44 md:h-52 md:w-52">
                    <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(242,233,214,0.12)" strokeWidth="7" />
                      <motion.circle
                        cx="60" cy="60" r="54" fill="none"
                        stroke={score >= QUIZ.length - 2 ? "#54c7ab" : score >= QUIZ.length / 2 ? "#e5b04c" : "#ff7457"}
                        strokeWidth="7" strokeLinecap="round"
                        strokeDasharray={C}
                        initial={{ strokeDashoffset: C }}
                        animate={{ strokeDashoffset: C * (1 - score / QUIZ.length) }}
                        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-5xl font-black">
                        {score}
                        <span className="text-2xl text-cream/45">/{QUIZ.length}</span>
                      </span>
                    </div>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-crimson px-5 py-2 font-mono text-xs uppercase tracking-[0.25em] text-paper">
                    <Award size={14} />
                    Nivel {level}
                  </span>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-goldbright">
                    Resultado de la práctica
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-black leading-tight md:text-5xl">
                    {score === QUIZ.length ? "«Lo» dominado." : "Buen ejercicio."}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-cream/70">
                    {msg}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      onClick={restart}
                      className="inline-flex items-center gap-2.5 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-goldbright"
                    >
                      <RotateCcw size={15} />
                      Repetir la práctica
                    </button>
                    <a
                      href="https://instagram.com/idiomaswebespanol"
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/45 transition-colors hover:text-goldbright"
                    >
                      Comparte tu nivel con tu profesor en @idiomaswebespanol
                    </a>
                  </div>
                </div>
              </div>

              {/* review */}
              <div className="mt-12 border-t border-cream/10 pt-8">
                <p className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cream/50">
                  <ListChecks size={14} className="text-goldbright" />
                  Revisión de respuestas
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {QUIZ.map((qq, i) => {
                    const a = answers[i];
                    const correctFn = fnById(qq.answer);
                    return (
                      <div
                        key={qq.id}
                        className="flex items-start gap-3.5 rounded-xl border border-cream/10 bg-cream/[0.03] p-4"
                      >
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                            a?.ok ? "bg-viridian" : "bg-crimson"
                          } text-paper`}
                        >
                          {a?.ok ? <Check size={13} /> : <X size={13} />}
                        </span>
                        <div>
                          <p className="font-display text-sm italic leading-snug text-cream/85">
                            <HiText text={qq.sentence} focus={qq.focus} hex="#e5b04c" />
                          </p>
                          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/45">
                            {correctFn.code} · {correctFn.short}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  /* ---------------- question screen ---------------- */
  return (
    <section id="practica" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <SectionHead
          num="05"
          overline="Práctica guiada"
          hex="#0e5b4f"
          title={
            <>
              Demuestra tu dominio del{" "}
              <span className="italic text-viridian">«lo»</span>
            </>
          }
          lead="Ocho frases reales: identifica la función exacta de «lo» en cada una. Recibirás la explicación gramatical al instante."
        />

        <Reveal>
          {/* progress */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex flex-1 gap-1.5">
              {QUIZ.map((qq, i) => {
                const a = answers[i];
                return (
                  <span
                    key={qq.id}
                    className="h-1.5 flex-1 rounded-full transition-colors duration-500"
                    style={{
                      background: a
                        ? a.ok
                          ? "#0e5b4f"
                          : "#c2391e"
                        : i === idx
                          ? "rgba(25,20,16,0.4)"
                          : "rgba(25,20,16,0.12)",
                    }}
                  />
                );
              })}
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-ink/55">
              {String(idx + 1).padStart(2, "0")} / {String(QUIZ.length).padStart(2, "0")}
            </span>
          </div>

          {/* question card */}
          <div className="overflow-hidden rounded-3xl bg-ink p-7 text-cream md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-goldbright">
                  ¿Qué función cumple «lo» aquí?
                </p>
                <p className="mt-5 font-display text-2xl font-medium leading-snug md:text-4xl">
                  <HiText text={q.sentence} focus={q.focus} hex="#e5b04c" />
                </p>
              </motion.div>
            </AnimatePresence>

            {/* grouped options */}
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {CATS.map((cat) => {
                const meta = CATEGORY_META[cat];
                const fns = FUNCTIONS.filter((f) => f.category === cat);
                return (
                  <div key={cat}>
                    <p
                      className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em]"
                      style={{ color: meta.bright }}
                    >
                      {meta.label}
                    </p>
                    <div className="space-y-2.5">
                      {fns.map((f) => {
                        const isAnswer = f.id === q.answer;
                        const isPicked = f.id === picked;
                        let cls =
                          "border-cream/15 bg-cream/[0.03] text-cream/85 hover:border-cream/45 hover:bg-cream/[0.07]";
                        if (picked && isAnswer)
                          cls = "border-viridian bg-viridian/25 text-cream";
                        else if (picked && isPicked)
                          cls = "border-crimson bg-crimson/25 text-cream";
                        else if (picked)
                          cls = "border-cream/10 bg-transparent text-cream/35";
                        return (
                          <button
                            key={f.id}
                            onClick={() => pick(f.id)}
                            disabled={!!picked}
                            className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${cls}`}
                          >
                            <span className="flex items-baseline gap-2.5">
                              <span
                                className="font-mono text-[10px] font-semibold"
                                style={{ color: picked ? undefined : meta.bright }}
                              >
                                {f.code}
                              </span>
                              <span className="text-sm font-medium">{f.name}</span>
                            </span>
                            {picked && isAnswer && <Check size={15} className="shrink-0 text-emerald-300" />}
                            {picked && isPicked && !isAnswer && <X size={15} className="shrink-0 text-red-300" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* feedback */}
            <AnimatePresence>
              {picked && (
                <motion.div
                  initial={{ opacity: 0, y: 16, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-8 flex flex-col gap-4 border-t border-cream/10 pt-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                          picked === q.answer ? "bg-viridian" : "bg-crimson"
                        } text-paper`}
                      >
                        {picked === q.answer ? <Check size={14} /> : <X size={14} />}
                      </span>
                      <p className="max-w-xl text-sm leading-relaxed text-cream/75">
                        <strong className="font-semibold text-cream">
                          {picked === q.answer ? "Correcto. " : `Era ${fnById(q.answer).code} · ${fnById(q.answer).name}. `}
                        </strong>
                        {q.explanation}
                      </p>
                    </div>
                    <button
                      onClick={next}
                      className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-goldbright"
                    >
                      {idx + 1 === QUIZ.length ? "Ver resultado" : "Siguiente"}
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
