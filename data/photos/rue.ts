export interface RuePhoto {
  src: string;
  alt: string;
}

export interface RueRecit {
  slug: string;
  personne: string;

  gps: {
    lat: number;
    lng: number;
  };

  date: string;
  heure: string;

  parole: string[];

  couverture: string;

  photos: RuePhoto[];
}

// export const rueRecits: RueRecit[] = [];

export const rueRecits: RueRecit[] = [
  {
    slug: "demo-recit",
    personne: "DÉMO — À REMPLACER",

    gps: {
      lat: 0,
      lng: 0,
    },

    date: "00/00/0000",
    heure: "00h00",

    parole: [
      "Contenu temporaire utilisé uniquement pour tester le nouveau gabarit de la série RUE.",
      "Ce texte, les coordonnées, la date et les photographies ne constituent pas un véritable récit éditorial.",
    ],

    couverture: "01.jpg",

    photos: [
      {
        src: "01.jpg",
        alt: "Photographie temporaire de démonstration RUE",
      },
      {
        src: "02.jpg",
        alt: "Photographie temporaire de démonstration RUE",
      },
      {
        src: "03.jpg",
        alt: "Photographie temporaire de démonstration RUE",
      },
    ],
  },
];