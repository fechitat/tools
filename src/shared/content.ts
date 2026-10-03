export type TulDifficulty = "beginner" | "intermediate" | "advanced";

export interface TulRank {
  name: string;
  color?: string;
  order: number;
}

export interface RecommendedTime {
  min: number; // en segundos
  max: number; // en segundos
}

export interface Tul {
  id: string;
  slug: string;
  name: string;
  koreanName?: string;
  movements: number;
  rank?: TulRank;
  meaning?: string;
  history?: string;
  diagram?: string;
  image?: string;
  recommendedTime?: RecommendedTime;
  difficulty?: TulDifficulty;
  videoUrl?: string;
  published: boolean;
}

/**
 * Catálogo base oficial de formas (TUL) de Taekwon-Do ITF.
 * Preparado para sincronizarse o desacoplarse hacia WordPress headless REST API.
 */
export const OFFICIAL_TULS: Tul[] = [
  {
    id: "chon-ji",
    slug: "chon-ji",
    name: "Chon-Ji",
    koreanName: "천지",
    movements: 19,
    rank: {
      name: "9° Gup (Punta Amarilla)",
      color: "bg-yellow-400 text-yellow-950",
      order: 1,
    },
    meaning:
      "Significa literalmente 'El Cielo y la Tierra'. En Oriente se interpreta como la creación del mundo o el principio de la historia de la humanidad, por lo que es el patrón inicial ejecutado por el principiante. Consta de dos partes semejantes: una representa el cielo y la otra la tierra.",
    history:
      "Diseñado por el General Choi Hong Hi en los años formativos del Taekwon-Do para asentar las posturas fundamentales de Gunnun Sogi (caminar) y Niunja Sogi (en L).",
    diagram: "+ (Cruz)",
    recommendedTime: {
      min: 25,
      max: 35,
    },
    difficulty: "beginner",
    published: true,
  },
  {
    id: "dan-gun",
    slug: "dan-gun",
    name: "Dan-Gun",
    koreanName: "단군",
    movements: 21,
    rank: {
      name: "8° Gup (Amarillo)",
      color: "bg-yellow-500 text-black",
      order: 2,
    },
    meaning:
      "Llamado así por el legendario fundador de Corea en el año 2333 a.C., Dan-Gun Wanggeom.",
    history:
      "Representa las raíces milenarias de la civilización coreana. Introduce defensas altas continuas y ataques directos a la zona alta.",
    diagram: "I (Línea mayúscula)",
    recommendedTime: {
      min: 30,
      max: 42,
    },
    difficulty: "beginner",
    published: true,
  },
  {
    id: "do-san",
    slug: "do-san",
    name: "Do-San",
    koreanName: "도산",
    movements: 24,
    rank: {
      name: "7° Gup (Punta Verde)",
      color: "bg-green-500 text-white",
      order: 3,
    },
    meaning:
      "Seudónimo del patriota Ahn Chang-Ho (1876-1938). Los 24 movimientos representan su vida dedicada a fomentar la educación de Corea y su movimiento independentista.",
    history:
      "Ahn Chang-Ho dedicó toda su vida a la causa educativa y libertaria coreana frente a la ocupación. El patrón introduce patada frontal de ataque seguida de encadenamiento con puños.",
    diagram: "Z (Escalón invertido)",
    recommendedTime: {
      min: 35,
      max: 48,
    },
    difficulty: "beginner",
    published: true,
  },
  {
    id: "won-hyo",
    slug: "won-hyo",
    name: "Won-Hyo",
    koreanName: "원효",
    movements: 28,
    rank: {
      name: "6° Gup (Verde)",
      color: "bg-green-600 text-white",
      order: 4,
    },
    meaning:
      "Nombrado por el célebre monje que introdujo el Budismo en la dinastía Silla en el año 686 d.C.",
    history:
      "El monje Won-Hyo fue una de las figuras espirituales más influyentes de la historia de Corea, promoviendo la unidad entre las distintas corrientes budistas.",
    diagram: "I",
    recommendedTime: {
      min: 40,
      max: 55,
    },
    difficulty: "intermediate",
    published: true,
  },
  {
    id: "yul-gok",
    slug: "yul-gok",
    name: "Yul-Gok",
    koreanName: "율곡",
    movements: 38,
    rank: {
      name: "5° Gup (Punta Azul)",
      color: "bg-blue-500 text-white",
      order: 5,
    },
    meaning:
      "Seudónimo del gran filósofo y académico Yi I (1536-1584), llamado el 'Confucio de Corea'. Los 38 movimientos hacen referencia a su lugar de nacimiento en el paralelo 38° y el diagrama representa la palabra 'Erudito'.",
    history:
      "Yi I no sólo fue un respetado erudito confuciano sino también un estratega que anticipó la necesidad de defensa nacional de su patria.",
    diagram: "士 (Erudito)",
    recommendedTime: {
      min: 50,
      max: 70,
    },
    difficulty: "intermediate",
    published: true,
  },
  {
    id: "joong-gun",
    slug: "joong-gun",
    name: "Joong-Gun",
    koreanName: "중근",
    movements: 32,
    rank: {
      name: "4° Gup (Azul)",
      color: "bg-blue-600 text-white",
      order: 6,
    },
    meaning:
      "Nombrado en honor al patriota Ahn Joong-Gun, quien ejecutó a Hiro-Bumi Ito, primer gobernador general japonés de Corea. Los 32 movimientos representan la edad de Ahn cuando fue ejecutado en la prisión de Lui-Shung (1910).",
    history:
      "Un símbolo indiscutido del coraje y la resistencia del pueblo coreano. Introduce posturas como Dwitbal Sogi y técnicas defensivas simultáneas.",
    diagram: "I",
    recommendedTime: {
      min: 45,
      max: 65,
    },
    difficulty: "intermediate",
    published: true,
  },
  {
    id: "toi-gye",
    slug: "toi-gye",
    name: "Toi-Gye",
    koreanName: "퇴계",
    movements: 37,
    rank: {
      name: "3° Gup (Punta Roja)",
      color: "bg-red-500 text-white",
      order: 7,
    },
    meaning:
      "Seudónimo del eminente erudito Yi Hwang (siglo XVI), autoridad del neo-confucianismo. Los 37 movimientos refieren a su lugar de nacimiento en el paralelo 37° y el diagrama representa el término 'Erudito'.",
    history:
      "Yi Hwang fundó la academia confuciana Dosan Seowon y promovió el estudio riguroso de la moral y la autodisciplina moral marcial.",
    diagram: "士 (Erudito)",
    recommendedTime: {
      min: 55,
      max: 75,
    },
    difficulty: "advanced",
    published: true,
  },
  {
    id: "hwa-rang",
    slug: "hwa-rang",
    name: "Hwa-Rang",
    koreanName: "화랑",
    movements: 29,
    rank: {
      name: "2° Gup (Rojo)",
      color: "bg-red-600 text-white",
      order: 8,
    },
    meaning:
      "Nombrado por el grupo guerrero juvenil Hwa-Rang que se originó en la dinastía Silla hace más de 1350 años. Los 29 movimientos hacen referencia a la 29° División de Infantería donde el Taekwon-Do maduró.",
    history:
      "Los caballeros Hwa-Rang practicaban artes marciales y códigos éticos rigurosos que forjaron la base de los principios del Taekwon-Do ITF.",
    diagram: "I",
    recommendedTime: {
      min: 45,
      max: 65,
    },
    difficulty: "advanced",
    published: true,
  },
  {
    id: "choong-moo",
    slug: "choong-moo",
    name: "Choong-Moo",
    koreanName: "충무",
    movements: 30,
    rank: {
      name: "1° Gup (Punta Negra)",
      color: "bg-neutral-900 text-white",
      order: 9,
    },
    meaning:
      "Nombre póstumo conferido al gran Almirante Yi Sun-Sin de la dinastía Yi. Fue el inventor del barco acorazado (Kobukson) en 1592, precursor del submarino moderno. El patrón finaliza con un ataque de mano izquierda para simbolizar su lamentable muerte sin oportunidad de mostrar todo su potencial.",
    history:
      "Último patrón de la categoría de Gup antes del cinturón negro (I Dan). Requiere giros en salto de 360 grados y combinaciones de ataque de alta dificultad técnica.",
    diagram: "I",
    recommendedTime: {
      min: 50,
      max: 70,
    },
    difficulty: "advanced",
    published: true,
  },
];

/**
 * Obtiene todos los TULs publicados.
 * En el futuro, si hay conectividad con WordPress REST API, se delega aquí.
 */
export async function getTuls(): Promise<Tul[]> {
  return OFFICIAL_TULS.filter((t) => t.published);
}

/**
 * Obtiene un TUL por su slug único.
 */
export async function getTul(slug: string): Promise<Tul | undefined> {
  const tuls = await getTuls();
  return tuls.find((t) => t.slug.toLowerCase() === slug.toLowerCase());
}

/**
 * Obtiene un TUL por su identificador único.
 */
export async function getTulById(id: string): Promise<Tul | undefined> {
  const tuls = await getTuls();
  return tuls.find((t) => t.id === id);
}
