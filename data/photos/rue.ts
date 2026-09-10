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

  date?: string;
  heure?: string;

  parole: string[];

  couverture: string;

  photos: RuePhoto[];
}

function createPhotos(
  personne: string,
  count: number,
): RuePhoto[] {
  return Array.from({ length: count }, (_, index) => ({
    src: `${String(index + 1).padStart(2, "0")}.jpg`,
    alt: `${personne} — série RUE — photographie ${index + 1}`,
  }));
}

export const rueRecits: RueRecit[] = [
  {
    slug: "gueule-grande",
    personne: "Gueulle Grande",
    gps: {
      lat: 48.8723,
      lng: 2.5677,
    },
    parole: [
      "La force et le mental peuvent te permettre d'avoir un “regain” d'énergie qui vont te permettre de te relever et affronter les aléas de la vie.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Gueulle Grande", 4),
  },
  {
    slug: "fresh-oklm",
    personne: "Fresh Oklm",
    gps: {
      lat: 48.9468,
      lng: 2.5110,
    },
    parole: [
      "Le début d'une fin. On s'éloigne de l'obscurité pour quitter nos rues. Nos fenêtres ne sont pas nos seules échappatoires.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Fresh Oklm", 3),
  },
  {
    slug: "kix-ra",
    personne: "Kix.ra",
    gps: {
      lat: 48.9499,
      lng: 2.5266,
    },
    parole: [
      "Sevran c'est ma maison, la ou j'ai grandis, la ou je me sens bien . Même une fois partie, je viendrais toujours d'ici.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Kix.ra", 4),
  },
  {
    slug: "ohdaeshoe",
    personne: "Ohdaesho",
    gps: {
      lat: 48.9521,
      lng: 2.5106,
    },
    parole: [
      "Ce parc je l’ai fréquenté toute ma jeunesse, juste pour le terrain de basket, je jouais avec des monstres et j’avais un très mauvais niveau mais ils avait du respect pour moi malgré mon niveau",
      "Arrivé ici en 1998 en plein de milieu de la coupe du monde, je comprenais pas pourquoi on avait quitté notre studio pour vivre ici, finalement c’était pas si mal d’être dans ce quartier",
      "Il y avait toujours un truc qui se passait devant ce grillage, des embrouilles qui s’enveniment, des amours qui grandissent et des amitiés qui durerons.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Ohdaesho", 4),
  },
  {
    slug: "piksoo-koko-caramelo",
    personne: "Piksoo Koko Caramelo",
    gps: {
      lat: 48.9483,
      lng: 2.5239,
    },
    parole: [
      "Derrière moi la lumière place Nelson Mandela et d’une apparence fantômale, Marcel Paul est le témoin du quartier.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Piksoo Koko Caramelo", 14),
  },
  {
    slug: "s-m-e-g-o",
    personne: "SMEGO",
    gps: {
      lat: 48.9460,
      lng: 2.5088,
    },
    parole: [
      "Ces rues, j’ai eu le temps de les emprunter un milliard de fois. C'est les dernières lignes droites avant chez moi et où j’ai si souvent croisé des visages familiers.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("SMEGO", 2),
  },
  {
    slug: "nakmuay-issa",
    personne: "Nakmuay Issa",
    gps: {
      lat: 48.9495,
      lng: 2.5080,
    },
    parole: [
      "Douze comme le nombre de l’horloge et les nombreuses heures passées ici à refaire le Monde ”",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Nakmuay Issa", 3),
  },
  {
    slug: "lila-bim",
    personne: "Lila Bim",
    gps: {
      lat: 48.8958,
      lng: 2.3969,
    },
    parole: [
      "Entre deux rives: imaginez le passage entre deux mondes, deux réalités, avec le désir ardent d'aller au-delà de ce qui a été pour vous par d’autres.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Lila Bim", 5),
  },
  {
    slug: "them-them",
    personne: "Them Them",
    gps: {
      lat: 48.9488,
      lng: 2.5086,
    },
    parole: [
      "Cette rue est remplie de souvenirs d’enfance, où la joie et la peine se mélangent constamment. La fierté et la culture s’épanouissent au gré des rencontres et des histoires.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Them Them", 3),
  },
  {
    slug: "chrystelle-arnaud",
    personne: "Chrystelle Arnaud",
    gps: {
      lat: 48.8720,
      lng: 2.3316,
    },
    parole: [
      "L'avenue de l'Opéra est la rue de Paris qui me procure le plus d'émotions artistiques. Elle me fait voyager à travers les Arts, d'un côté l'Opéra Garnier et de l'autre le Musée du Louvre, en passant par la Comédie française.",
      "J'ai eu beaucoup de plaisir à découvrir le Louvre et ses galeries lors d'une première visite parisienne mais mon plaisir fut encore plus grand lorsque j'ai découvert le plafond de l'Opéra peint par Chagall quand je suis venue m'installer à Paris.",
      "Depuis, je pense à tous ces chefs-d'œuvre à chaque fois que je passe sur l'avenue de l'Opéra.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Chrystelle Arnaud", 6),
  },
  {
    slug: "manela-alma-v",
    personne: "Manela Alma V",
    gps: {
      lat: 48.954214,
      lng: 2.328328,
    },
    parole: [
      "La nuit dans la street, j'ai souvent marché seule parce que les rues sont désertes, silencieuses et tranquilles. Mais dans ta tête, t'es jamais tranquille parce que la rue ça rend fou, ça rend triste ; et en même temps, ça te rend heureux, pourquoi ? Parce que tu connais rien d'autre.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Manela Alma V", 4),
  },
  {
    slug: "tony-demarle",
    personne: "Tony Demarle",
    gps: {
      lat: 48.949075,
      lng: 2.509858,
    },
    parole: [
      "9 rue du Dauphiné. Des amis, des copains , la croisée des chemins … un jour il a fallut partir , mais on aime y revenir.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Tony Demarle", 3),
  },
  {
    slug: "fuzi-baptista",
    personne: "Fuzi Baptista",
    gps: {
      lat: 48.949153,
      lng: 2.513656,
    },
    parole: [
      "Cogito, ergo sum, sous un cerisier en fleurs, je trouve la beauté dans la diversité de ce monde.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Fuzi Baptista", 3),
  },
  {
    slug: "wombat-in-wonderland",
    personne: "Wombat In wonderland",
    gps: {
      lat: 48.864731,
      lng: 2.390167,
    },
    parole: [
      "La cour du 38 est l’endroit où on joue, on crie, on fait des réunions ou des concerts, où on fait pousser des fleurs, de la menthe, où on cohabite et c’est probablement mon endroit préféré dans le quartier",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Wombat In wonderland", 4),
  },
  {
    slug: "doums1982",
    personne: "Doums 1982",
    gps: {
      lat: 48.870850,
      lng: 2.378225,
    },
    parole: [
      "Les poings serrés, le quartier a connu des temps passés difficiles. Mais avec le temps, nous avons évolué, appris à pardonner pour avancer vers un avenir meilleur.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Doums 1982", 2),
  },
  {
    slug: "gueuledange",
    personne: "Gueule D’Ange",
    gps: {
      lat: 48.947131,
      lng: 2.508294,
    },
    parole: [
      "Le parc est mon point de gravité ; j'ai toujours traîné aux alentours sans m'en éloigner, mais j'y suis rattaché d'une manière ou d'une autre.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Gueule D’Ange", 7),
  },
  {
    slug: "nadia-boucheni",
    personne: "Nadia Boucheni",
    gps: {
      lat: 48.893842,
      lng: 2.212461,
    },
    parole: [
      "Un jour de mars 2016, une voiture m'a percutée sur cette avenue, me forçant à faire une pause dans ma vie, surtout sur le plan professionnel. Après ma convalescence, j'ai enfin pris la décision de changer de voie. Depuis, j'ai co-fondé le magazine Dialna.fr, je suis devenue journaliste. J'ai été éditrice, organisatrice d'événements culturels. Cet accident, qui aurait pu me coûter la vie a en réalité été l'une des meilleures choses qui me soient arrivées.",
    ],
    couverture: "01.jpg",
    photos: createPhotos("Nadia Boucheni", 2),
  },
];
