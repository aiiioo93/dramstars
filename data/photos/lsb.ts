export type LsbPhotoData = {
  title: string;
  legend: string;
  alt: string;
  description: string;
  location?: string;
  date?: string;
  time?: string;
};

export const lsbPhotos: Record<string, LsbPhotoData> = {
  "01": {
    title: "Le jour ne sait pas encore qu'il s'éteint.",
    legend:
      "Au bout du chemin, une lumière s'allume — et personne ne l'a vue venir.",
    location: "Aulnay-sous-Bois",
    date: "07/02/2018",
    time: "20:12",
    alt: "Chemin déneigé traversant un jardin enneigé, arbres nus, immeuble jaune éclairé au loin, ciel crépusculaire.",
    description: `Il neige encore sur les pavillons. Le chemin a été dégagé, on a marché, on a déblayé, on a fait comme si le jour allait tenir. Mais regardez bien au fond : un immeuble jaune brille déjà. Il n'attend pas la nuit pour s'allumer — il sait quelque chose que le jardin ne sait pas. C'est l'instant où le voile du jour est encore là, mais commence à se faire mince. On marche sans se rendre compte qu'on entre dans autre chose.

Le jour essaye de tenir le coup comme la neige dans ce décor. Au loin, un immeuble jaune brille et n'attend pas la nuit pour s'allumer. Il sait quelque chose que le jardin ne sait pas. C'est l'instant où le voile du jour est encore là, mais commence à se faire mince. On marche sans se rendre compte qu'on entre dans autre chose.`,
  },

  "02": {
    title: "Il a tourné le dos au jour.",
    legend:
      "Devant lui, quatre tours s'allument — et il reste à les regarder s'éveiller.",
    alt: "Homme de dos sur un terrain enneigé regardant quatre tours de cité éclairées au crépuscule.",
    location: "Aulnay-sous-Bois",
    date: "07/02/2018",
    time: "21:28",
    description: `La neige est encore là, mais le jour s'en va. L'homme s'est arrêté au milieu du terrain, les pieds plantés, les mains dans les poches. Il ne bouge pas. Devant lui, la cité s'allume sans bruit — une fenêtre, puis dix, puis cent. C'est la frontière exacte : derrière lui, ce qui reste du blanc ; devant lui, le jaune qui prend. Il regarde comme on regarde quelqu'un se réveiller. Il sait qu'il va y entrer.`,
  },

  "03": {
    title: "La cité veille. Lui, il plie.",
    legend:
      "À côté de lui, une affiche brille pour personne — et c'est ça qui fait mal.",
    alt: "Homme assis seul sur un banc, capuche relevée, place de cité éclairée au sodium, panneau publicitaire BMW en arrière-plan.",
    location: "Aulnay-sous-Bois",
    date: "27/01/2018",
    time: "18:20",
    description: `Il s'est assis sur le premier bloc venu. Capuche relevée, coudes sur les genoux, la tête tombée vers le sol. Autour de lui, la nuit fait son travail : les lampadaires s'étoilent, le panneau publicitaire allume sa nouvelle voiture, l'arrêt de bus attend des gens qui ne viendront pas tout de suite. Tout fonctionne. Tout brille pour quelqu'un. Lui, il est de l'autre côté de la lumière — celui qui s'est posé là parce qu'il ne savait plus où aller. La ghafla n'est pas le sommeil. C'est le moment où on s'assoit sans savoir pourquoi.`,
  },

  "04": {
    title: "Elle regarde. Lui attend.",
    legend:
      "Entre eux, un saule fait écran — et c'est par lui que la nuit commence à parler.",
    alt: "Jeune femme en survêtement rose Adidas assise sur un banc et jeune homme perché sur une poubelle, séparés par un saule pleureur, devant une résidence éclairée la nuit.",
    location: "Aulnay-sous-Bois",
    date: "28/12/2017",
    time: "23:22",
    description: `Ils se sont posés là sans se concerter. Elle, sur l'accoudoir du banc, pas sur l'assise — comme on s'installe pour rester libre de repartir. Lui, debout sur une poubelle, en hauteur, en surveillance peut-être. Entre eux, le saule pleureur descend ses branches comme un rideau qu'on n'a pas tiré tout à fait. Elle regarde droit, sans bouger. Lui regarde ailleurs. La résidence dort autour d'eux, une porte rose veille au fond, et la nuit consent enfin à recevoir des présences. C'est la première fois qu'on les voit. C'est la première fois qu'ils nous voient.`,
  },

  "05": {
    title: "Les arbres filtrent. La cité parle derrière.",
    legend:
      "On ne voit jamais aussi bien que quand on regarde à travers quelque chose.",
    alt: "Sous-bois d'arbres nus en contre-jour, immeuble jaune éclairé au sodium en arrière-plan, lampadaires en étoile.",
    location: "Aulnay-sous-Bois",
    date: "31/01/2018",
    time: "20:22",
    description: `Il n'y a personne dans cette image. C'est sa force. La cité brille de l'autre côté du bois, jaune et habitée, et nous, on est là, à la lisière, sur les feuilles mortes, à la regarder respirer entre les troncs. Les arbres ne cachent pas — ils filtrent. Ils mettent une grille entre nous et elle, et c'est par cette grille que la lumière prend forme. C'est le moment où on cesse de marcher pour regarder vraiment. Le moment où on comprend que la cité, vue de loin et à travers, dit autre chose que la cité vue de face.`,
  },

  "06": {
    title: "La cité se regarde dans l'eau.",
    legend:
      "Quand le sol devient ciel, le regardeur ne sait plus de quel côté il se tient.",
    alt: "Cour de résidence la nuit, immeuble éclairé au sodium se reflétant dans une grande flaque d'eau au premier plan, lampadaires en étoile.",
    location: "Aulnay-sous-Bois",
    date: "31/01/2018",
    time: "19:59",
    description: `Il a plu. L'eau est restée. Et la cité, qui croyait se tenir debout, se retrouve aussi couchée — étalée dans une flaque, à l'envers, identique. Les fenêtres allumées sont en bas comme en haut. Les arbres descendent dans l'eau comme ils montent vers le ciel. Le lampadaire à droite n'est plus seul : il a son frère liquide qui le double exactement. C'est le moment où la nuit cesse de cacher et commence à doubler. Où le regard, à force d'aiguisement, voit deux mondes là où il n'en voyait qu'un. On peut traverser cette image en marchant. On peut aussi y descendre les marches et se demander, en bas, si on est encore du bon côté.`,
  },

  "07": {
    title: "Le bois n'est pas vide. Il les attendait.",
    legend:
      "Ce que la lumière du jour aurait pris pour de la solitude, la nuit le révèle comme une présence.",
    alt: "Deux hommes dans un sous-bois nocturne, l'un appuyé contre un tronc regardant l'objectif, l'autre penché tenant un jeune arbre, pneu de moto suspendu à un tronc à gauche.",
    location: "Aulnay-sous-Bois",
    date: "31/01/2018",
    time: "20:53",
    description: `On disait que les arbres étaient habités. On avait raison — mais pas comme on le croyait. Pas des esprits. Des hommes. Ils sont là, entre les troncs, comme chez eux, et l'un d'eux regarde droit pour que ce soit clair. Le pneu pendu au tronc, à gauche, dit que ce lieu est marqué depuis longtemps. Ce n'est pas un sous-bois de promenade — c'est un territoire. La nuit n'a pas posé des fantômes ici. Elle a juste enlevé le voile qui cachait que quelqu'un, déjà, y vivait.`,
  },

  "08": {
    title: "La nuit cessait de protéger.",
    legend:
      "On a beau aimer la lumière, il y a des endroits où elle n'a plus rien à embellir.",
    alt: "Deux hommes près d'un mur dégradé, l'un adossé au mur derrière un grillage rouillé, l'autre au premier plan main au visage, arbre nu, déchets au sol.",
    location: "Aulnay-sous-Bois",
    date: "13/12/2017",
    time: "20:44",
    description: `Le mur est sale. L'arbre est tordu. Le sol est jonché. Et deux hommes sont là, comme si c'était normal d'être là — parce que pour eux, c'est normal. Le plus jeune devant, la main au visage, le plus vieux derrière, adossé au mur comme à un meuble qu'il connaît. La lumière ne flatte plus. Elle ne fait plus d'étoiles, elle ne dédouble plus rien, elle ne dépose plus une grille de poésie entre nous et le réel. Elle éclaire — sèchement. Et ce qu'elle éclaire, c'est ce que la cité range sous le tapis : un coin de mur, deux types, l'hiver. La beauté qu'on croyait acquise dans les images précédentes, ici, on en mesure le prix.`,
  },

  "09": {
    title: "Elle est debout. C'est déjà une réponse.",
    legend:
      "Le monde passe en traînées de lumière — et elle, elle reste.",
    alt: "Jeune femme debout dans une friche d'herbes hautes la nuit, bonnet orange et veste de cuir, lampadaires en étoile et traînée de phares en arrière-plan.",
    location: "Sevran",
    date: "30/12/2017",
    time: "22:25",
    description: `Personne ne devrait être là. C'est une friche, un terre-plein, l'herbe pousse comme on l'a laissée pousser. Mais elle, elle s'est arrêtée au milieu, dans une robe et un bonnet, et le sodium derrière elle dessine quatre étoiles dans le ciel violet. Une voiture passe — sa lumière est encore là, étirée en bande jaune sur tout le cadre — elle, elle est restée. C'est ce qui fait la force de l'image : tout bouge sauf elle. Et son t-shirt dit déjà ce qu'il y a à savoir : « je ne veux pas de votre drame ». Après les murs sales, après les bois marqués, après les hommes pliés, voici quelqu'un qui se tient droit dans une herbe qui n'appartient à personne — et qui décide, simplement en restant là, que la nuit ne lui prendra rien.`,
  },

  "10": {
    title: "Il s'est arrêté. C'est sa façon d'être resté.",
    legend:
      "Autour de lui le monde s'agite ; lui, le temps de la photo, accepte d'être vu.",
    alt: "Jeune homme en veste de jean et capuche bleue assis sur le dossier d'un banc, bouteille de bière à côté, feuilles mortes au sol, sous-bois flou éclairé au sodium en arrière-plan.",
    location: "Aulnay-sous-Bois",
    date: "04/12/2017",
    time: "20:43",
    description: `Il s'est assis sur le haut du banc, pas sur l'assise — comme si l'assise était pour quelqu'un d'autre, ou comme si rester un peu plus haut permettait de mieux voir. La bouteille est posée à côté, pas encore bue, comme une virgule dans la nuit. Derrière lui, les arbres bougent — le temps de pose les a rendus flous, fantomatiques — mais lui ne bouge pas. Et il regarde droit, sans défi, sans douceur particulière. Il consent à ce qu'on le voie. Après tout ce que la nuit a montré jusqu'ici — les murs, les bois marqués, les hommes pliés — voici quelqu'un qui s'arrête, qui s'assoit, et qui dit, sans le dire : « oui, je suis là aussi, et je l'ai toujours été. »`,
  },

  "11": {
    title: "Dehors la cité. Dedans, un autre monde.",
    legend:
      "Il y a un moment où l'on n'a plus envie de regarder dehors — alors on s'éclaire dedans.",
    alt: "Deux hommes dans une voiture vus à travers le pare-brise la nuit, le conducteur penché en avant éclairé par une lumière froide, cité au sodium en arrière-plan.",
    location: "Aulnay-sous-Bois",
    date: "28/01/2018",
    time: "21:26",
    description: `La voiture est garée mais personne ne part. Devant, un homme s'est penché sur quelque chose — une feuille, un écran, on ne sait pas — et la lumière qui l'éclaire est froide, bleutée, intérieure. Derrière lui, dans l'ombre, son passager regarde par l'autre fenêtre. Ils ne se parlent pas. Ils ne se regardent pas non plus. La cité, dehors, continue de tenir ses étoiles de sodium au-dessus des voitures garées — mais elle n'entre plus ici. L'habitacle est devenu une niche : un endroit où l'on se replie après avoir trop vu. Et la lumière qu'on choisit maintenant, ce n'est plus celle qui tombe du ciel — c'est celle qu'on garde au creux de la main.`,
  },

  "12": {
    title: "Celui qui photographie n'est jamais seul.",
    legend:
      "La nuit aussi nous regarde — et parfois, elle nous répond avec sa propre lampe.",
    alt: "Vue depuis l'intérieur d'une voiture la nuit, un homme flou au premier plan, dans la voiture voisine deux hommes dont l'un tient un téléphone allumé à bout de bras.",
    location: "Aulnay-sous-Bois",
    date: "02/02/2018",
    time: "20:39",
    description: `On a longtemps cru qu'on était seul à marcher dans la nuit, à s'arrêter sous les arbres, à attendre la bonne lumière. Et puis on lève les yeux, et dans la voiture d'à côté, quelqu'un tient un téléphone allumé à bout de bras — exactement comme nous. Il filme. Il photographie. Il regarde lui aussi. La cité n'a jamais été un objet à observer en solitaire : elle a toujours été pleine de gens qui faisaient la même chose, sans qu'on les voie. C'est la dernière révélation de la série, et la plus simple : celui qui voit dans la nuit est toujours en train d'être vu. Et la lampe de l'autre, à travers deux vitres, est une réponse — pas une menace, pas une concurrence — juste une présence qui dit, à sa manière : moi aussi, je suis iL@dra.`,
  },
};