import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CUADRO, CATEGORY_META, fnById } from "../data/content";
import type { CategoryId } from "../data/content";
import { Reveal, SectionHead, HiText } from "./shared";

type Filter = "todas" | CategoryId;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "pronombre", label: "Pronombre" },
  { id: "articulo", label: "Artículo neutro" },
  { id: "intensificador", label: "Intensificador" },
];

export default function ComparisonTable() {
  const [filter, setFilter] = useState<Filter>("todas");
  const rows = CUADRO.filter((r) => filter === "todas" || r.category === filter);

  return (
    <section id="cuadro" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHead
          num="03"
          overline="Cuadro comparativo"
          hex="#c2391e"
          title={
            <>
              Las siete caras de <span className="italic text-crimson">«lo»</span>
            </>
          }
          lead="Todas las funciones reunidas en un solo mapa. Filtra por categoría para comparar estructuras y usos."
        />

        {/* filters */}
        <Reveal className="mb-8 flex flex-wrap items-center gap-2.5">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            const hex =
              f.id === "todas" ? "#191410" : CATEGORY_META[f.id as CategoryId].hex;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className="rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300"
                style={{
                  borderColor: active ? hex : "rgba(25,20,16,0.2)",
                  background: active ? hex : "transparent",
                  color: active ? "#f5eedf" : "rgba(25,20,16,0.6)",
                }}
              >
                {f.label}
                <span className="ml-2 opacity-60">
                  {f.id === "todas"
                    ? CUADRO.length
                    : CUADRO.filter((r) => r.category === f.id).length}
                </span>
              </button>
            );
          })}
        </Reveal>

        {/* header row */}
        <div className="hidden grid-cols-12 gap-4 border-b border-ink/20 pb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/45 md:grid">
          <span className="col-span-1">Cód.</span>
          <span className="col-span-3">Estructura</span>
          <span className="col-span-4">Función</span>
          <span className="col-span-4">Ejemplo de uso</span>
        </div>

        {/* rows */}
        <motion.div layout className="divide-y divide-ink/10">
          <AnimatePresence mode="popLayout">
            {rows.map((r) => {
              const meta = CATEGORY_META[r.category];
              const code = fnById(r.fid).code;
              return (
                <motion.article
                  layout
                  key={r.fid}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative grid grid-cols-1 gap-3 py-6 md:grid-cols-12 md:items-center md:gap-4 md:py-7"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-2 left-0 w-[3px] rounded-full transition-all duration-300 group-hover:w-[5px]"
                    style={{ background: meta.hex }}
                  />
                  <div className="col-span-1 pl-5 md:pl-6">
                    <span
                      className="font-display text-2xl font-black"
                      style={{ color: meta.hex }}
                    >
                      {code}
                    </span>
                  </div>
                  <div className="col-span-3 pl-5 md:pl-0">
                    <span className="block font-mono text-sm font-medium text-ink">
                      {r.structure}
                    </span>
                    <span
                      className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: meta.hex }}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <p className="col-span-4 pl-5 text-sm leading-relaxed text-ink/65 md:pl-0">
                    {r.role}
                  </p>
                  <p className="col-span-4 pl-5 font-display text-lg italic leading-snug text-ink md:pl-0 md:text-xl">
                    <HiText text={r.example} focus={r.focus} hex={meta.hex} />
                  </p>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-8">
          <p className="font-mono text-[11px] leading-relaxed text-ink/50">
            * Nota de la NGLE: solo en la construcción intensificadora (2.D) el
            adjetivo concuerda en género y número; en todas las demás, «lo» es
            invariable.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
