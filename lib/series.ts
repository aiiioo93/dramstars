export type PhotoSeries = {
  slug: string;
  number: string;
  acronym: string;
  title: string;
  description: string;
  location: string;
  image: string;
  period: string;
  credits?: string;
};

export const photoSeries: PhotoSeries[] = [
  {
    slug: "zup",
    number: "01",
    acronym: "ZUP",
    title: "Zone Urbaine Photographique",
    description:
      "Je fixe les stigmates de la banlieue. Les blocs qui s’abîment, les corps dans le décor, l’enfermement dans les têtes.",
    location: "Seine-Saint-Denis",
    image: "/Photos/series/zup.jpg",
    period: "2011 → 2017",
    credits: "Adèle Tilouine · Nora Noor · La Rumeur",
  },
  {
    slug: "lsb",
    number: "02",
    acronym: "LSB",
    title: "Lumière sous-Bois",
    description:
      "Je m’enfonce dans la nuit. Le silence, les ombres, les questions qu’on ne se pose qu’à voix basse.",
    location: "Seine-Saint-Denis",
    image: "/Photos/series/lsb.jpg",
    period: "fin 2017 → été 2022",
    credits: "Martine Ravache, historienne de l’art",
  },
  {
    slug: "rue",
    number: "03",
    acronym: "RUE",
    title: "Récits Urbains Extérieurs",
    description:
      "Les personnes photographiées choisissent le lieu et racontent leur rapport à leur environnement.",
    location: "Seine-Saint-Denis",
    image: "/Photos/series/rue.jpg",
    period: "rentrée 2022 → en cours",
  },
];
