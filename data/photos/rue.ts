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

export const rueRecits: RueRecit[] = [];