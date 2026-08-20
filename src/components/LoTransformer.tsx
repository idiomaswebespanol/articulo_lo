import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightLeft } from "lucide-react";
import type { TransformExample } from "../data/content";

export default function LoTransformer({
  ex,
  uid,
  hex,
  dark = false,
}: {
  ex: TransformExample;
  uid: string;
  hex: string;
  dark?: boolean;
}) {
  const [natural, setNatural] = useState(false);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setNatural((v) => !v), 3000);
    return () => clearInterval(t);
  }, [auto]);

  const segs = natural ? ex.after : ex.before;
  const mIdx = natural ? ex.mAfter : ex.mBefore;

  const tabBase =
    "px-3.5 py-1.5 transition-all duration-300 uppercase tracking-[0.15em]";
  const tabOn = { background: hex, color: dark ? "#191410" : "#f5eedf" };

  return (
    <div
      className={`rounded-2xl border p-5 transition-colors md:p-6 ${
        dark
          ? "border-cream/15 bg-cream/[0.04]"
          : "border-ink/15 bg-paper shadow-[0_18px_40px_-30px_rgba(25,20,16,0.35)]"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        {ex.prompt ? (
          <p
            className={`font-display text-base italic md:text-lg ${
              dark ? "text-cream/55" : "text-ink/55"
            }`}
          >
            {ex.prompt}
          </p>
        ) : (
          <span />
        )}
        <div
          className={`flex overflow-hidden rounded-full border font-mono text-[10px] ${
            dark ? "border-cream/25" : "border-ink/25"
          }`}
        >
          <button
            onClick={() => {
              setAuto(false);
              setNatural(false);
            }}
            className={tabBase}
            style={!natural ? tabOn : undefined}
          >
            repite
          </button>
          <button
            onClick={() => {
              setAuto(false);
              setNatural(true);
            }}
            className={tabBase}
            style={natural ? tabOn : undefined}
          >
            con «lo»
          </button>
        </div>
      </div>

      <p
        className={`mt-5 flex min-h-[3.75rem] flex-wrap items-baseline gap-x-1.5 font-display text-xl leading-relaxed md:text-[1.65rem] ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        {segs.map((s, i) =>
          i === mIdx ? (
            <motion.span
              key={`${uid}-morph`}
              layoutId={`${uid}-morph`}
              transition={{ type: "spring", stiffness: 380, damping: 33 }}
              className="inline-block rounded-lg px-2 py-0.5 font-bold italic"
              style={
                natural
                  ? { background: hex, color: dark ? "#191410" : "#f5eedf" }
                  : { boxShadow: `inset 0 0 0 1.5px ${hex}99`, color: hex }
              }
            >
              {s}
            </motion.span>
          ) : (
            <span key={`${uid}-${i}`}>{s}</span>
          )
        )}
      </p>

      <div
        className={`mt-4 flex items-center gap-2.5 border-t pt-3.5 ${
          dark ? "border-cream/10" : "border-ink/10"
        }`}
      >
        <ArrowRightLeft size={13} style={{ color: hex }} className="shrink-0" />
        <AnimatePresence mode="wait">
          <motion.p
            key={String(natural)}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className={`font-mono text-[11px] leading-relaxed ${
              dark ? "text-cream/55" : "text-ink/55"
            }`}
          >
            {natural ? ex.noteAfter : ex.noteBefore}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
