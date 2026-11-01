# DRAMSTARS — Récapitulatif du travail du 1er novembre 2026

Ce document sert à mettre à jour la conversation principale ChatGPT sur l’état actuel du projet DRAMSTARS.

## Contexte

- Travail effectué sur la branche `dev-rue`.
- Aucun commit, push, merge vers `main` ou déploiement n’a été réalisé.
- Les polices existantes n’ont pas été modifiées.
- MapLibre et son worker local ont été conservés.
- Les changements préexistants dans Git ont été préservés.

## Accueil

- Le titre « Ni vainqueur, ni vaincu : mon histoire » et le diaporama ont été conservés.
- Les compteurs du diaporama ont été retirés.
- La mention LADRAMSTARS placée en bas du diaporama a été retirée.
- Les trois blocs ZUP, LSB et RUE de l’accueil ont été retirés de l’affichage.
- Une image fixe issue de la vraie PsychoKarta a été ajoutée en bas de l’accueil.
- Un seul bouton « Ouvrir la PsychoKarta » mène vers `/ou-je-suis`.
- L’aperçu est une image statique : aucune deuxième carte interactive n’est chargée sur l’accueil.
- Le fichier de l’aperçu a été renouvelé pour éviter que le navigateur affiche une ancienne version conservée en cache.
- L’aperçu actuel ne montre plus le logo MapLibre ni les mentions OpenFreeMap, OpenMapTiles ou OpenStreetMap développées.

Fichier utilisé :

`public/Photos/psychokarta-preview-clean-2026-11.png`

## Portrait et Mon histoire

- « Madou / LADRAMSTARS » a été retiré sous le portrait.
- « Portrait / 84 » a été retiré.
- Le crédit `© Camille Haddad` a été conservé.
- « Lire mon histoire » est devenu « Mon histoire ».
- La rubrique « À propos » est maintenant présentée comme « Mon histoire ».
- Aucun faux article, blog ou événement biographique n’a été ajouté.

## Menu ordinateur et smartphone

- Le menu a été simplifié.
- Le déclencheur est maintenant un carré accessible en haut à droite.
- Le rond noir flottant et les anciens éléments décoratifs ont été retirés.
- Les pointillés, les chiffres décoratifs, `35 MM / INDEX` et la ligne `PERSONNES NOMMÉES / LIEUX NON NOMMÉS` ont été retirés.
- « D’où je viens » est masqué du menu tant que le chapitre n’est pas prêt.
- Le menu conserve :
  - Chapitre I ;
  - Où je suis ;
  - les accès directs ZUP, LSB et RUE ;
  - Mon histoire.
- Le fond beige a été remplacé par un gris minéral `#c9c6bd`, à faire valider visuellement par le client.
- Le logo original n’a pas été recréé, car son fichier n’est pas disponible.
- Les états de survol, toucher et focus clavier ont été corrigés.
- Quand un bouton ou un lien devient noir ou sombre, le texte, les flèches et les éléments internes restent désormais visibles en blanc.
- Une sécurité de contraste a été appliquée à l’ensemble du site pour éviter le même problème sur d’autres boutons.

## Page « Où je suis »

- Le nom `PsychoKarta`, avec un K, est utilisé dans l’interface et les métadonnées.
- « Chapitre I » et le trait de séparation ont été conservés.
- `/ Territoires / 35 MM` a été retiré.
- « Carte photographique » a été retiré.
- Les textes techniques visibles comme `Carte épurée / MapLibre`, `points / 3 séries` et `zoom libre / aucun lieu nommé` ont été retirés.

## PsychoKarta

- Toutes les séries sont visibles au chargement normal.
- Les numéros visibles à l’intérieur des marqueurs ont été retirés.
- Les noms accessibles pour les lecteurs d’écran sont conservés.
- Les distances depuis le point d’origine ont été retirées des fiches, fenêtres et panneaux mobiles.
- La recherche textuelle RUE a été conservée uniquement lorsque le filtre RUE est actif.
- La liste des blases en bas de page a été masquée et n’est plus accessible au clavier.
- Les données RUE restent conservées pour un retour futur de cette liste.

### Palette des marqueurs

- ZUP : noir `#0a0a0a`.
- LSB : violet prune `#65345f`.
- RUE : ocre `#ad681f`.
- UMC : rouge brique `#963a2c`.
- Aucun marqueur vert.
- Les formes diffèrent également afin que l’information ne repose pas seulement sur la couleur.

### Filtres

- Quatre commandes principales sont affichées : ZUP, LSB, RUE et UMC.
- Les compteurs ont été retirés.
- Le bouton « Tous » a été retiré.
- Un second clic sur le filtre ZUP, LSB ou RUE déjà actif revient à la vue générale.
- Après une sélection UMC, un bouton « Vue générale » permet de revenir facilement à toutes les séries.

### UMC

- Le terme public « lieu collectif » a été remplacé par `UMC — Unité de mémoire collective`.
- Le bouton UMC déroule une liste verticale adaptée au mobile et capable d’accueillir davantage de lieux.
- L’UMC disponible est `Église Saint-Paul`, à `48.9470, 2.5095`.
- Les huit photographies déjà identifiées ont été réutilisées : cinq ZUP et trois LSB.
- Au clic sur l’UMC :
  - la carte zoome sur la zone ;
  - les huit photographies sont affichées même après un autre filtre ;
  - le nom du lieu apparaît en très grand ;
  - le nom reste contenu dans la largeur disponible sur smartphone ;
  - le visiteur peut revenir à la vue générale.
- L’album chronologique de l’Église Saint-Paul est conservé comme accès complémentaire.
- Les barres blanches et la gare n’ont pas été ajoutées faute de coordonnées et d’associations fiables.

### Débordement des points

- Les marqueurs et les traits sont maintenant strictement découpés aux limites de la carte.
- Pendant un zoom ou un déplacement, ils ne peuvent plus sortir du cadre de la PsychoKarta.
- La bande supérieure « Point d’origine / départs depuis le point d’origine » possède son propre niveau d’affichage opaque.
- La zone MapLibre commence strictement sous cette bande.
- Les marqueurs, les traits et les fiches ne peuvent plus recouvrir cette zone supérieure.
- Les fenêtres des points continuent à être repositionnées pour rester visibles dans la carte.

### Logo et crédits cartographiques

- Le logo visuel MapLibre a été retiré des cartes.
- Les crédits OpenFreeMap, OpenMapTiles et OpenStreetMap ne sont plus développés en permanence.
- Comme ces crédits sont obligatoires pour les licences du fond, ils restent disponibles dans un petit bouton d’information replié.
- L’aperçu statique de l’accueil a ensuite été recapturé et renommé pour reprendre ce nouveau rendu.

### Respiration bâti/végétal

- L’animation existante a été rendue plus perceptible, avec un cycle de plusieurs secondes et une ondulation de quelques pixels.
- Elle est limitée lorsque la carte est visible.
- Elle est suspendue lorsque l’onglet est masqué.
- Elle respecte `prefers-reduced-motion`.
- Les ressources sont nettoyées au démontage.
- Limite actuelle : le fond distant fournit des polygones de bâti et de végétation séparés, mais pas une géométrie précalculée de leur frontière commune. L’effet actuel reste donc partiel et ne doit pas être présenté comme une frontière exacte.

## Dates et titres ZUP/LSB

- Un formateur central de date a été créé.
- Le format public devient par exemple `20/07/2015 à 03h47`.
- Une date ou une heure manquante reste absente : aucune heure fictive `00h00` n’est créée.
- Les titres publics ZUP et LSB utilisent maintenant exactement `Sang titre N`.
- Une suite commune permanente de 1 à 28 a été créée entre ZUP et LSB.
- L’ordre initial utilise la date et l’heure EXIF.
- En cas d’égalité exacte, l’identifiant stable sert d’ordre technique déterministe.
- Une photographie déjà publiée conserve définitivement son numéro.
- Une nouvelle photographie absente du registre provoque une demande d’attribution explicite au lieu de renuméroter les anciennes.

Fichier du registre :

`data/photo-number-registry.json`

## Textes, périodes et crédits des séries

- Les textes de refonte générés pour ZUP et LSB ont été sauvegardés avant retrait de l’affichage public.
- Ils ne sont pas présentés comme les textes originaux de Madou.
- Les textes WordPress originaux n’ont pas été trouvés et n’ont pas été réinventés.
- ZUP est maintenant daté `2011 → 2017`.
- Crédits ZUP : Adèle Tilouine, Nora Noor et La Rumeur au même niveau.
- LSB est maintenant daté `fin 2017 → été 2022`.
- Crédit LSB : Martine Ravache, historienne de l’art.
- RUE est maintenant daté `rentrée 2022 → en cours`.

Sauvegarde créée :

`data/backups/series-copy-before-2026-10-28.json`

## Série RUE

### Piksoo Koko Caramelo

- La carte et les miniatures utilisent toujours une image fixe.
- Aucun lecteur vidéo n’est chargé dans la carte.
- Dans la page du récit, seule la vidéo MP4 reste affichée.
- Les quatorze photographies accompagnant auparavant la vidéo ont été retirées de l’affichage.
- Les fichiers physiques ont été conservés.

### Sarah B.

- Cinq images sont présentes dans le dossier Sarah.
- Aucun texte réel ni couverture validée n’a été trouvé.
- Aucun faux dix-huitième récit n’a été créé.

### Rick Ta

- Trois images sont présentes.
- Aucun texte réel n’a été trouvé.
- Aucune fiche fictive n’a été créée.

## Chapitre II — D’où je viens

- L’entrée est masquée du menu.
- La page conserve `noindex`.
- La lettre est placée avant la carte dans la structure.
- Le faux fac-similé précédent a été masqué.
- Un message indique que la lettre originale manque dans les fichiers.
- La carte est maintenant sur fond blanc.
- La grille, les textures, les plis, l’ombre décorative et le bloc « Atlas en construction » ont été retirés.
- Aucun point, trajet ou document fictif n’a été ajouté.

## Thaïlande

- Aucune route, donnée ou sélection de médias Thaïlande exploitable n’a été trouvée.
- Aucun contenu fictif n’a été créé.
- Aucun système d’accès protégé n’était présent dans le code inspecté.

## Vérifications réalisées

- `npm run lint` : réussi.
- `npx tsc --noEmit` : réussi.
- `npm run test:photos` : 5 tests réussis.
- `npm run test:browser` : réussi sur ordinateur et environnement tactile.
- `npm run build` : build Next.js réussi.
- `npm run audit:public-media` : 198 images publiques contrôlées sans champ GPS/EXIF/XMP/IPTC de localisation détecté.
- Vérifications visuelles de la PsychoKarta sur ordinateur et smartphone.
- Vérification de l’absence de débordement horizontal.
- Vérification de l’ouverture et de la fermeture du menu.
- Vérification du zoom UMC et de ses huit photographies.
- Vérification de l’absence de chiffres dans les marqueurs.
- Vérification du nouvel aperçu statique de l’accueil.

## Éléments encore attendus du client

- Logo original PNG ou JPEG.
- Tracés réels des rues parcourues et références situationnistes.
- Données permettant de calculer la frontière exacte entre bâti et végétal.
- Liste complète des UMC avec coordonnées et associations fiables.
- Texte réel et couverture validée de Sarah B.
- Texte réel de Rick Ta.
- Neuf couvertures RUE au format 3:4, 900 × 1200 px, sRGB.
- Textes WordPress originaux de ZUP et LSB avec leurs quatre champs.
- Lettre réelle du chapitre II et validations nécessaires.
- Médias Thaïlande identifiés et validés.

## État actuel

- Le travail est toujours présent localement sur `dev-rue`.
- Aucun commit ou push n’a été effectué pendant cette intervention.
- La page 404 n’a pas été modifiée, conformément à son report.
