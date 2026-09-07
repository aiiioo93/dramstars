export interface ChapitrePhoto {
  src: string;
  alt: string;
}

export interface ChapitreSection {
  id: string;
  periode: string;
  texte: string[];
  photos: ChapitrePhoto[];

  lienInterne?: {
    href: string;
    libelle: string;
  };
}

// export const chapitreSections: ChapitreSection[] = [];

export const chapitreSections: ChapitreSection[] = [
  {
    id: "1999-2001",
    periode: "1999 — 2001",
    texte: [],
    photos: [],
  },

  {
    id: "2001-2013",
    periode: "2001 — 2013",
    texte: [],
    photos: [],
    lienInterne: {
      href: "/series/zup",
      libelle: "Z.U.P",
    },
  },

  {
    id: "2013-2019",
    periode: "2013 — 2019",
    texte: [],
    photos: [],
  },

  {
    id: "octobre-2019",
    periode: "Octobre 2019",
    texte: [],
    photos: [],
  },
];