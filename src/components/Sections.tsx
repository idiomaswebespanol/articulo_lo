import type { ReactNode } from "react";
import { Asterisk, CornerDownRight, Quote } from "lucide-react";
import {
  CATEGORY_META,
  type LoFunction,
  type StaticExample,
} from "../data/content";
import { Reveal, SectionHead, Formula, HiText, CategoryChip } from "./shared";
import LoTransformer from "./LoTransformer";

/* ---------- static example card ---------- */
function StaticCard({
  ex,
  hex,
  dark,
  index,
}: {
  ex: StaticExample;
  hex: string;
  dark: boolean;
  index: number;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 md:p-6 ${
        dark
          ? "border-cream/15 bg-cream/[0.04]"
          : "border-ink/15 bg-paper shadow-[0_18px_40px_-30px_rgba(25,20,16,0.35)]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em]"
          style={{ color: hex }}
        >
          <Quote size={12} />
          Ejemplo {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p
        className={`mt-4 font-display text-2xl leading-snug md:text-3xl ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        <HiText text={ex.text} focus={ex.focus} hex={hex} />
      </p>
      {ex.gloss && (
        <p
          className={`mt-4 flex items-start gap-2 font-mono text-[11px] leading-relaxed ${
            dark ? "text-cream/55" : "text-ink/55"
          }`}
        >
          <CornerDownRight size={13} className="mt-0.5 shrink-0" style={{ color: hex }} />
          {ex.gloss}
        </p>
      )}
    </div>
  );
}

/* ---------- one grammatical function block ---------- */
function FunctionBlock({
  fn,
  index,
  dark = false,
}: {
  fn: LoFunction;
  index: number;
  dark?: boolean;
}) {
  const meta = CATEGORY_META[fn.category];
  const hex = dark ? meta.bright : meta.hex;
  const flip = index % 2 === 1;

  return (
    <Reveal
      className={`border-t py-14 md:py-20 ${
        dark ? "border-cream/12" : "border-ink/12"
      }`}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* theory */}
        <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
          <div className="flex flex-wrap items-center gap-4">
            <span
              className="font-display text-5xl font-black leading-none md:text-6xl"
              style={{ color: hex }}
            >
              {fn.code}
            </span>
            <CategoryChip cat={fn.category} dark={dark} />
          </div>
          <h3
            className={`mt-5 font-display text-3xl font-black tracking-tight md:text-4xl ${
              dark ? "text-cream" : "text-ink"
            }`}
          >
            {fn.name}
          </h3>
          <p
            className="mt-3 font-display text-lg italic leading-snug"
            style={{ color: hex }}
          >
            {fn.tagline}
          </p>
          <p
            className={`mt-4 text-sm leading-relaxed md:text-base ${
              dark ? "text-cream/65" : "text-ink/65"
            }`}
          >
            {fn.description}
          </p>
          <div className="mt-6">
            <Formula tokens={fn.formula} hex={hex} dark={dark} />
          </div>
          {fn.notes && (
            <ul className="mt-6 space-y-2.5">
              {fn.notes.map((n) => (
                <li
                  key={n}
                  className={`flex items-start gap-2 font-mono text-[11px] leading-relaxed ${
                    dark ? "text-cream/55" : "text-ink/55"
                  }`}
                >
                  <Asterisk size={13} className="mt-0.5 shrink-0" style={{ color: hex }} />
                  {n}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* examples */}
        <div
          className={`flex flex-col justify-center gap-5 lg:col-span-7 ${
            flip ? "lg:order-1" : ""
          }`}
        >
          {fn.examples.map((ex, i) =>
            ex.kind === "transform" ? (
              <LoTransformer
                key={i}
                ex={ex}
                uid={`${fn.id}-${i}`}
                hex={hex}
                dark={dark}
              />
            ) : (
              <StaticCard key={i} ex={ex} hex={hex} dark={dark} index={i} />
            )
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- full section shell ---------- */
export default function GrammarSection({
  id,
  num,
  overline,
  title,
  lead,
  fns,
  hex,
  dark = false,
}: {
  id: string;
  num: string;
  overline: string;
  title: ReactNode;
  lead: string;
  fns: LoFunction[];
  hex: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-24 md:py-36 ${
        dark ? "bg-ink text-cream" : "text-ink"
      }`}
    >
      {dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-48 top-10 hidden lg:block"
        >
          <div className="relative h-[36rem] w-[36rem] rounded-full border border-cream/[0.07]">
            <span className="absolute left-1/2 top-1/2 h-[142%] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-cream/[0.07]" />
          </div>
        </div>
      )}
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHead
          num={num}
          overline={overline}
          title={title}
          lead={lead}
          hex={hex}
          dark={dark}
        />
        <div>
          {fns.map((fn, i) => (
            <FunctionBlock key={fn.id} fn={fn} index={i} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  );
}
