import type { CSSProperties } from "react";
import { CATEGORY_META } from "../data/content";

interface Item {
  t: string;
  cat?: keyof typeof CATEGORY_META;
}

const DEFAULT_ITEMS: Item[] = [
  { t: "lo vi", cat: "pronombre" },
  { t: "lo bueno", cat: "articulo" },
  { t: "lo sabía", cat: "pronombre" },
  { t: "lo que dijiste", cat: "articulo" },
  { t: "lo está", cat: "pronombre" },
  { t: "lo de ayer", cat: "articulo" },
  { t: "lo altas que son", cat: "intensificador" },
  { t: "lo importante", cat: "articulo" },
  { t: "lo dudo", cat: "pronombre" },
  { t: "lo bien que canta", cat: "intensificador" },
];

export default function Marquee({
  items = DEFAULT_ITEMS,
  dark = false,
  dur = 42,
}: {
  items?: Item[];
  dark?: boolean;
  dur?: number;
}) {
  const row = [...items, ...items, ...items];
  return (
    <div
      className={`marquee-paused relative overflow-hidden border-y py-4 md:py-5 ${
        dark ? "border-cream/10 bg-soot" : "border-ink/10 bg-parch"
      }`}
      aria-hidden
    >
      <div
        className="animate-marquee flex w-max whitespace-nowrap"
        style={{ "--marquee-dur": `${dur}s` } as CSSProperties}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {row.map((it, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span
                  className="font-display text-xl italic md:text-3xl"
                  style={{
                    color: it.cat
                      ? dark
                        ? CATEGORY_META[it.cat].bright
                        : CATEGORY_META[it.cat].hex
                      : dark
                        ? "#f2e9d6"
                        : "#191410",
                  }}
                >
                  {it.t}
                </span>
                <span
                  className={`mx-6 inline-block h-1.5 w-1.5 rotate-45 md:mx-8 ${
                    dark ? "bg-cream/30" : "bg-ink/30"
                  }`}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
