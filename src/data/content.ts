/* ------------------------------------------------------------------ */
/*  La complejidad del «LO» — modelo de contenido gramatical           */
/*  Fuentes: NGLE (RAE & ASALE, 2009) · Diccionario panhispánico       */
/*  de dudas (2005)                                                    */
/* ------------------------------------------------------------------ */

export type CategoryId = "pronombre" | "articulo" | "intensificador";

export interface CategoryMeta {
  label: string;
  short: string;
  hex: string; // color sobre fondo claro
  bright: string; // color sobre fondo oscuro
}

export const CATEGORY_META: Record<CategoryId, CategoryMeta> = {
  pronombre: {
    label: "Pronombre personal",
    short: "Pronombre",
    hex: "#0e5b4f",
    bright: "#54c7ab",
  },
  articulo: {
    label: "Artículo neutro",
    short: "Artículo",
    hex: "#c2391e",
    bright: "#ff7457",
  },
  intensificador: {
    label: "Intensificador",
    short: "Intensif.",
    hex: "#9c6a0b",
    bright: "#e5b04c",
  },
};

/* ---------------- Fórmulas gramaticales ---------------- */

export interface FormulaToken {
  t: string;
  k: "lo" | "slot" | "op" | "txt";
}

/* ---------------- Ejemplos ---------------- */

export interface TransformExample {
  kind: "transform";
  prompt?: string;
  before: string[]; // segmentos; mBefore marca el elemento reemplazado
  after: string[]; // segmentos; mAfter marca «lo»
  mBefore: number;
  mAfter: number;
  noteBefore: string;
  noteAfter: string;
}

export interface StaticExample {
  kind: "static";
  text: string;
  focus: string;
  gloss?: string;
}

export type Example = TransformExample | StaticExample;

/* ---------------- Función gramatical ---------------- */

export interface LoFunction {
  id: string;
  code: string;
  category: CategoryId;
  name: string;
  short: string;
  tagline: string;
  description: string;
  formula: FormulaToken[];
  examples: Example[];
  notes?: string[];
}

export const FUNCTIONS: LoFunction[] = [
  {
    id: "cd-masc",
    code: "1.A",
    category: "pronombre",
    name: "Objeto directo masculino",
    short: "CD masculino",
    tagline: "Sustituye a un sustantivo masculino singular ya mencionado.",
    description:
      "«Lo» ocupa el lugar del complemento directo para evitar la repetición inútil: el sustantivo desaparece y el pronombre se antepone al verbo conjugado.",
    formula: [
      { t: "sustantivo ♂ singular", k: "slot" },
      { t: "→", k: "op" },
      { t: "lo", k: "lo" },
      { t: "+ verbo", k: "txt" },
    ],
    examples: [
      {
        kind: "transform",
        prompt: "— ¿Has visto el libro?",
        before: ["— Sí, vi ", "el libro", " en la mesa."],
        after: ["— Sí, ", "lo", " vi en la mesa."],
        mBefore: 1,
        mAfter: 1,
        noteBefore: "Se repite «el libro»: redundante y pesado.",
        noteAfter: "«el libro» (masc. sing.) → «lo», antepuesto al verbo.",
      },
      {
        kind: "transform",
        prompt: "Conocí a Carlos ayer…",
        before: ["…y anoche invité a cenar a ", "Carlos", "."],
        after: ["…y anoche ", "lo", " invité a cenar."],
        mBefore: 1,
        mAfter: 1,
        noteBefore: "Se repite «Carlos»: ya sabemos de quién hablamos.",
        noteAfter: "CD de persona (masc. sing.): «a Carlos» → «lo».",
      },
    ],
  },
  {
    id: "cd-neutro",
    code: "1.B",
    category: "pronombre",
    name: "Idea o proposición completa",
    short: "CD neutro",
    tagline: "Sustituye a una oración entera, un hecho o una situación.",
    description:
      "Cuando la entidad reemplazada no es un objeto con género, sino una cláusula, una situación o un hecho abstracto, se emplea el pronombre neutro «lo».",
    formula: [
      { t: "oración / idea", k: "slot" },
      { t: "→", k: "op" },
      { t: "lo", k: "lo" },
      { t: "neutro", k: "txt" },
    ],
    examples: [
      {
        kind: "transform",
        prompt: "— ¿Sabías que mañana no hay clase?",
        before: ["— No, no sabía ", "que mañana no hay clase", "."],
        after: ["— No, no ", "lo", " sabía."],
        mBefore: 1,
        mAfter: 1,
        noteBefore: "Repetir toda la cláusula sería innecesario.",
        noteAfter: "Una oración entera —«que mañana no hay clase»— cabe en «lo».",
      },
      {
        kind: "transform",
        prompt: "Dijeron que van a cerrar la calle…",
        before: ["…pero nadie cree ", "que van a cerrar la calle", "."],
        after: ["…pero nadie ", "lo", " cree."],
        mBefore: 1,
        mAfter: 1,
        noteBefore: "El hecho completo vuelve a repetirse.",
        noteAfter: "El hecho abstracto se condensa en «lo»: nadie lo cree.",
      },
    ],
  },
  {
    id: "atributo",
    code: "1.C",
    category: "pronombre",
    name: "Atributo copulativo",
    short: "Atributo",
    tagline: "Con ser, estar y parecer sustituye al atributo — invariable.",
    description:
      "«Lo» retoma el atributo —adjetivo o sustantivo— con los verbos copulativos. En esta función es completamente invariable, sin importar el género ni el número del sujeto.",
    formula: [
      { t: "cansada · médicos · listos…", k: "slot" },
      { t: "→", k: "op" },
      { t: "lo", k: "lo" },
      { t: "(invariable)", k: "txt" },
    ],
    examples: [
      {
        kind: "transform",
        prompt: "— ¿María está cansada?",
        before: ["— Sí, María está ", "cansada", "."],
        after: ["— Sí, ", "lo", " está."],
        mBefore: 1,
        mAfter: 1,
        noteBefore: "Atributo femenino singular: «cansada».",
        noteAfter: "Femenino singular → sigue siendo «lo». Nunca «*la está».",
      },
      {
        kind: "transform",
        prompt: "— ¿Son médicos tus hermanos?",
        before: ["— Sí, mis hermanos son ", "médicos", "."],
        after: ["— Sí, ", "lo", " son."],
        mBefore: 1,
        mAfter: 1,
        noteBefore: "Atributo masculino plural: «médicos».",
        noteAfter: "Masculino plural → sigue siendo «lo». Nunca «*los son».",
      },
    ],
    notes: [
      "Estrictamente invariable: no existe concordancia posible.",
      "Válido con ser, estar y parecer.",
    ],
  },
  {
    id: "lo-adj",
    code: "2.A",
    category: "articulo",
    name: "Cualidad abstracta",
    short: "lo + adjetivo",
    tagline: "«Lo + adjetivo» convierte una cualidad en un concepto.",
    description:
      "La sustantivación abstracta: el adjetivo calificativo se convierte en una entidad nominal. Equivale conceptualmente a «la cosa…» o «la parte…».",
    formula: [
      { t: "lo", k: "lo" },
      { t: "+", k: "op" },
      { t: "adjetivo", k: "slot" },
      { t: "=", k: "op" },
      { t: "concepto abstracto", k: "txt" },
    ],
    examples: [
      {
        kind: "static",
        text: "Lo bueno de viajar es aprender nuevas culturas.",
        focus: "Lo bueno",
        gloss: "≈ la parte buena · las cosas buenas",
      },
      {
        kind: "static",
        text: "Lo difícil es tomar la decisión correcta.",
        focus: "Lo difícil",
        gloss: "≈ la cosa difícil",
      },
    ],
    notes: ["«Lo» nunca acompaña a un sustantivo: no existe «*lo libro»."],
  },
  {
    id: "lo-que",
    code: "2.B",
    category: "articulo",
    name: "Relativo neutro «lo que»",
    short: "lo que",
    tagline: "Hace referencia a una idea, un hecho o un conjunto indeterminado.",
    description:
      "El relativo neutro apunta a algo no nombrado: una cantidad indefinida de cosas o una idea completa. Equivale en inglés a what o that which.",
    formula: [
      { t: "lo que", k: "lo" },
      { t: "+", k: "op" },
      { t: "oración", k: "slot" },
      { t: "=", k: "op" },
      { t: "«la cosa que…»", k: "txt" },
    ],
    examples: [
      {
        kind: "static",
        text: "Entendí lo que dijiste en la conferencia.",
        focus: "lo que dijiste",
        gloss: "≈ what you said",
      },
      {
        kind: "static",
        text: "Lo que necesitamos ahora es más tiempo.",
        focus: "Lo que necesitamos",
        gloss: "≈ what we need",
      },
    ],
  },
  {
    id: "lo-de",
    code: "2.C",
    category: "articulo",
    name: "Referencial «lo de»",
    short: "lo de",
    tagline: "Alude a un asunto, suceso o historia ya conocida.",
    description:
      "Permite referirse a un tema conocido por los interlocutores sin nombrarlo explícitamente: ambos saben de qué se trata.",
    formula: [
      { t: "lo de", k: "lo" },
      { t: "+", k: "op" },
      { t: "nombre / tema", k: "slot" },
      { t: "=", k: "op" },
      { t: "«el asunto de…»", k: "txt" },
    ],
    examples: [
      {
        kind: "static",
        text: "— ¿Te enteraste de lo de ayer?",
        focus: "lo de ayer",
        gloss: "≈ el suceso o el objeto de discusión de ayer",
      },
      {
        kind: "static",
        text: "Lo de Juan me tiene muy preocupado.",
        focus: "Lo de Juan",
        gloss: "≈ el asunto · la situación de Juan",
      },
    ],
  },
  {
    id: "intensif",
    code: "2.D",
    category: "intensificador",
    name: "Intensificador",
    short: "lo… que",
    tagline: "«Lo + adjetivo/adverbio + que» mide el grado de una cualidad.",
    description:
      "Expresa la intensidad o el grado con que se presenta una cualidad. En esta construcción particular, el adjetivo sí concuerda en género y número con el sustantivo al que modifica.",
    formula: [
      { t: "lo", k: "lo" },
      { t: "+", k: "op" },
      { t: "rápid-a / bien", k: "slot" },
      { t: "+ que", k: "op" },
      { t: "grado de la cualidad", k: "txt" },
    ],
    examples: [
      {
        kind: "static",
        text: "No sabes lo rápida que es esa computadora.",
        focus: "lo rápida que",
        gloss: "rápida ↔ computadora (fem. sing.): mide el nivel de rapidez",
      },
      {
        kind: "static",
        text: "Mira lo bien que canta María.",
        focus: "lo bien que",
        gloss: "con adverbio: intensifica la acción",
      },
    ],
    notes: [
      "Concordancia obligatoria: «lo altas que son las torres».",
      "Responde a la pregunta «¿cuánto de esa cualidad?».",
    ],
  },
];

export const fnById = (id: string): LoFunction =>
  FUNCTIONS.find((f) => f.id === id) ?? FUNCTIONS[0];

/* ---------------- Cuadro comparativo ---------------- */

export interface CuadroRow {
  fid: string;
  category: CategoryId;
  name: string;
  structure: string;
  role: string;
  example: string;
  focus: string;
}

export const CUADRO: CuadroRow[] = [
  {
    fid: "cd-masc",
    category: "pronombre",
    name: "Pronombre CD masculino",
    structure: "lo + verbo",
    role: "Sustituye sustantivo masculino singular",
    example: "Compré el carro → Lo compré.",
    focus: "Lo compré",
  },
  {
    fid: "cd-neutro",
    category: "pronombre",
    name: "Pronombre CD neutro",
    structure: "lo + verbo",
    role: "Sustituye una oración o idea entera",
    example: "No sé si vendrá, pero lo dudo.",
    focus: "lo dudo",
  },
  {
    fid: "atributo",
    category: "pronombre",
    name: "Pronombre atributivo",
    structure: "ser / estar + lo",
    role: "Sustituye adjetivo o sustantivo (con ser/estar)",
    example: "— ¿Están listos? — Sí, lo estamos.",
    focus: "lo estamos",
  },
  {
    fid: "lo-adj",
    category: "articulo",
    name: "Artículo + adjetivo",
    structure: "lo + adjetivo",
    role: "Crea un concepto abstracto",
    example: "Lo importante es participar.",
    focus: "Lo importante",
  },
  {
    fid: "lo-que",
    category: "articulo",
    name: "Artículo + relativo",
    structure: "lo que…",
    role: "Equivale a «la cosa que»",
    example: "Haz lo que consideres conveniente.",
    focus: "lo que",
  },
  {
    fid: "lo-de",
    category: "articulo",
    name: "Artículo + preposición",
    structure: "lo de…",
    role: "Referencia a un asunto o tema",
    example: "Debemos hablar de lo de la reunión.",
    focus: "lo de",
  },
  {
    fid: "intensif",
    category: "intensificador",
    name: "Intensificador",
    structure: "lo + adj./adv. + que",
    role: "Expresa el grado de una cualidad",
    example: "¡Increíble lo altas que son las torres!",
    focus: "lo altas que",
  },
];

/* ---------------- Banco de práctica ---------------- */

export interface QuizQuestion {
  id: number;
  sentence: string;
  focus: string;
  answer: string; // LoFunction.id
  explanation: string;
}

export const QUIZ: QuizQuestion[] = [
  {
    id: 1,
    sentence: "Terminé el ensayo y lo envié por correo.",
    focus: "lo",
    answer: "cd-masc",
    explanation:
      "«Lo» sustituye a «el ensayo», sustantivo masculino singular en función de complemento directo.",
  },
  {
    id: 2,
    sentence: "Dicen que subirán los precios, pero nadie lo cree.",
    focus: "lo",
    answer: "cd-neutro",
    explanation:
      "Aquí «lo» retoma toda la oración «que subirán los precios»: es el pronombre neutro.",
  },
  {
    id: 3,
    sentence: "— ¿Parecen contentos los niños? — Sí, lo parecen.",
    focus: "lo",
    answer: "atributo",
    explanation:
      "«Lo» sustituye al atributo «contentos» con el verbo parecer: invariable aunque sea masculino plural.",
  },
  {
    id: 4,
    sentence: "Lo mejor de la ciudad es su mercado nocturno.",
    focus: "Lo mejor",
    answer: "lo-adj",
    explanation:
      "«Lo + adjetivo» sustantiva la cualidad: equivale a «la parte mejor». Concepto abstracto.",
  },
  {
    id: 5,
    sentence: "No escuché lo que dijiste en la reunión.",
    focus: "lo que dijiste",
    answer: "lo-que",
    explanation:
      "Relativo neutro: equivale a «la cosa que dijiste» (what you said).",
  },
  {
    id: 6,
    sentence: "¿Te enteraste de lo del examen de mañana?",
    focus: "lo de",
    answer: "lo-de",
    explanation:
      "«Lo de» alude a un asunto que ambos interlocutores conocen, sin nombrarlo.",
  },
  {
    id: 7,
    sentence: "¡No imaginas lo altas que son las torres!",
    focus: "lo altas que",
    answer: "intensif",
    explanation:
      "Intensifica la cualidad: «altas» concuerda con «torres» (fem. pl.). Expresa grado.",
  },
  {
    id: 8,
    sentence: "— ¿Trajiste el pasaporte? — Sí, lo tengo en la mochila.",
    focus: "lo",
    answer: "cd-masc",
    explanation:
      "«Lo» reemplaza a «el pasaporte», complemento directo masculino singular.",
  },
];

export const levelFor = (score: number, total: number) => {
  if (score === total)
    return { level: "C1", msg: "Maestría absoluta del «lo». El neutro ya no tiene secretos para ti." };
  if (score >= total - 2)
    return { level: "B2", msg: "Dominio muy sólido: distingues las funciones con precisión." };
  if (score >= Math.ceil(total / 2))
    return { level: "B1", msg: "Buen camino: repasa el cuadro comparativo y vuelve a intentarlo." };
  return { level: "A2", msg: "El «lo» exige práctica: recorre la guía sección por sección." };
};
