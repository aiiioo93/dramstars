# DRAMSTARS — Rapport retours client et `Nouvelle photo`

Date du contrôle : 20 septembre 2026

## BRANCHE

- Branche de travail : `dev-rue`.
- Branche `main` non modifiée.
- Aucun merge et aucun push réalisés pendant cette intervention.

## NOUVELLE PHOTO

- Dossier source détecté : `Nouvelle photo/`.
- Fichiers attendus d'après le brief : 18.
- Fichiers réellement détectés : 18 JPEG.
- Fichiers intégrés : 17 couvertures RUE.
- Fichier non intégré : `rick ta.jpg`.
- Le dossier source a été conservé et n'a pas été supprimé, déplacé ou modifié.
- Les dimensions, EXIF et IPTC ont été inspectés pour les 18 fichiers.
- Les fichiers ont été exportés depuis Lightroom Classic 15.5.1 et contiennent les dates/heures de création, mais aucun titre, aucune légende, aucun mot-clé RUE et aucun GPS.
- Une recherche complémentaire dans les données XMP brutes n'a trouvé aucun champ GPS, titre, légende ou identifiant RUE.
- Les 17 copies web sont identiques aux sources et ne contiennent aucune géolocalisation précise.
- Le dossier non suivi `RUE/`, déjà présent dans l'espace de travail, contient 83 fichiers et n'a pas été modifié dans cette mission.

## MAPPING

| Source | Dimensions | Destination | Association |
|---|---:|---|---|
| `Gueule grande.jpg` | 3000 × 4000 | `gueule-grande/cover.jpg` | nom exact |
| `Fresh OKLM.jpg` | 1991 × 2655 | `fresh-oklm/cover.jpg` | nom exact |
| `kix ra.jpg` | 2345 × 3126 | `kix-ra/cover.jpg` | nom exact |
| `ohda.jpg` | 2647 × 3971 | `ohdaeshoe/cover.jpg` | nom abrégé correspondant au dossier source |
| `piksoo.jpg` | 3000 × 4000 | `piksoo-koko-caramelo/cover.jpg` | nom exact/abrégé |
| `smego.jpg` | 2585 × 3447 | `s-m-e-g-o/cover.jpg` | nom exact |
| `issa.jpg` | 2523 × 3781 | `nakmuay-issa/cover.jpg` | nom exact/abrégé |
| `lili.jpg` | 1882 × 2823 | `lila-bim/cover.jpg` | nom abrégé correspondant au dossier source |
| `them them.jpg` | 1987 × 2981 | `them-them/cover.jpg` | nom exact |
| `chrystelle.jpg` | 2667 × 4000 | `chrystelle-arnaud/cover.jpg` | prénom exact |
| `Alma.jpg` | 3273 × 4364 | `manela-alma-v/cover.jpg` | nom exact |
| `toni.jpg` | 1161 × 1548 | `tony-demarle/cover.jpg` | nom phonétique correspondant au dossier source |
| `fuzi.jpg` | 1480 × 2220 | `fuzi-baptista/cover.jpg` | nom exact |
| `wombat.jpg` | 1601 × 2134 | `wombat-in-wonderland/cover.jpg` | nom exact |
| `madouba.jpg` | 2078 × 2770 | `doums1982/cover.jpg` | même personne, tenue et lieu que la galerie Doums 1982 |
| `gueul dange.jpg` | 2569 × 3426 | `gueuledange/cover.jpg` | nom exact |
| `nadia B .jpg` | 6000 × 4000 | `nadia-boucheni/cover.jpg` | nom exact/initiale |
| `rick ta.jpg` | 2363 × 3150 | non intégré | récit, texte et lieu encore ambigus |

Les fichiers ne sont pas tous au ratio 3:4 malgré l'annonce initiale : certains sont en 2:3 et `nadia B .jpg` est horizontal. À la demande explicite suivante du développeur, la grille utilise désormais `object-cover` afin que chaque cadre soit entièrement rempli, y compris celui de Nadia. Cette consigne plus récente remplace la demande initiale d'affichage intégral sans recadrage.

## RUE

- Compteur « 17 récits publiés » retiré : oui.
- Nouveau compteur ajouté : non.
- Coordonnées GPS retirées de la grille générale : oui.
- Coordonnées conservées dans les données, les pages individuelles et la carte : oui.
- Coordonnées numériques normalisées à quatre décimales : oui.
- Affichage des coordonnées avec `toFixed(4)` : conservé.
- Grille responsive 2 / 3 / 4 colonnes : conservée et vérifiée.
- Décalage vertical des colonnes : conservé.
- Carte psychogéographique abstraite : conservée sans fond cartographique classique.
- Sarah B publiée : non.
- Rick Ta publié : non ; ses nouvelles métadonnées ne contiennent ni récit, ni identifiant RUE, ni GPS permettant de lever l'ambiguïté.
- Nouvelles couvertures installées : 17.
- Les 17 couvertures utilisent `couvertureFit: "cover"` et une sécurité CSS `object-cover` commune afin de remplir systématiquement leur cadre 3:4.
- Métadonnées GPS retirées des copies web : oui ; aucune donnée GPS n'était présente dans les sources et les copies ont été contrôlées.

## VIDÉO RUE

- Modèle image ou vidéo préparé : oui, avec une union typée.
- Formats prévus : MP4 et WebM optionnel.
- Lecture prévue : boucle, muet et `playsInline`.
- Poster optionnel et choix autoplay/contrôles pris en charge.
- Récit vidéo identifié : non.
- Orthographe exacte du nom, vignette animée ou fixe et autoplay ou clic : à valider.

## MENU EXPLORER

- Fond trop blanc remplacé par un crème grisé plus soutenu sur desktop et mobile.
- Direction noir/crème conservée, sans ajouter de bordeaux.
- Survol du chapitre II passé du bordeaux au noir.
- Comportements existants conservés : survol desktop, clic, fermeture, mobile et navigation clavier existante.
- Entrée principale « La lettre » retirée du menu desktop et mobile.
- La route `/d-ou-je-viens/lettre` reste accessible depuis le chapitre.

## CHAPITRE II

- `/d-ou-je-viens` : `noindex, nofollow` présent et vérifié.
- `/d-ou-je-viens/lettre` : `noindex, nofollow` présent et vérifié dans le code.
- Période 2001–2013 : fond noir retiré.
- Nouveau traitement : fond crème, texte noir atténué, grand espace vertical et absence de photographies conservée.
- Lien vers Z.U.P conservé.
- Les liens de test vers le chapitre restent accessibles sur cette branche de travail.

## COULEURS À ARBITRER

Les usages existants de `#713126` et `#ff3b18` n'ont pas été supprimés globalement, conformément au brief. Ils restent notamment présents :

- sur la page d'accueil ;
- dans plusieurs pages de séries ;
- dans les pages individuelles RUE ;
- sur la carte psychogéographique ;
- dans certains repères du menu et du chapitre II.

La décision de conserver ou retirer globalement ces couleurs reste à valider avec le client.

## ACCUEIL, 404, Z.U.P ET L.S.B

- Diaporama d'accueil : aucune photo ajoutée, car aucun fichier n'est identifié comme destiné à l'accueil.
- Photo d'ouverture de série : les 17 images identifiées ont été utilisées comme couvertures des récits RUE uniquement ; aucune ouverture générale de série n'a été choisie arbitrairement.
- Page 404 : aucun texte client dédié trouvé dans le dépôt ou dans `Nouvelle photo/`; page actuelle laissée intacte.
- Aucun fichier KML trouvé ; coordonnées actuelles conservées.
- Z.U.P et L.S.B : aucun contenu supprimé, réécrit ou écrasé.

## CONTRÔLES RESPONSIVE ET NAVIGATION

Contrôle dans Chrome headless sur le serveur local :

- smartphone 390 px : 2 colonnes, aucun débordement horizontal, menu compact, aucun compteur, aucun GPS dans la grille, aucune erreur Next.js ;
- tablette 768 px : 3 colonnes, aucun débordement horizontal, aucune erreur Next.js ;
- desktop 1440 px : 4 colonnes, aucun débordement horizontal, aucune erreur Next.js ;
- `/series/rue/carte` : chargement réussi, points/liens présents, aucune erreur Next.js ;
- `/series/rue/gueule-grande` : chargement réussi, aucune erreur Next.js ;
- `/d-ou-je-viens` : fond 2001–2013 calculé en `rgb(244, 243, 239)` et robots `noindex, nofollow`.

## TESTS

- `npm run lint` : réussi.
- `npm run build` : réussi avec Next.js 16.3.1.
- TypeScript : réussi.
- Génération statique : réussie.
- `git diff --check` : réussi.
- Quatre avertissements Turbopack préexistants subsistent dans `lib/photo-files.ts` à propos de l'accès dynamique au système de fichiers ; ils ne bloquent pas la compilation.

## À VALIDER / ÉLÉMENTS MANQUANTS

1. Déterminer les images destinées au diaporama d'accueil.
2. Déterminer la photographie d'ouverture générale de la série RUE.
3. Identifier le récit vidéo, son nom exact, le type de vignette et le mode de démarrage.
4. Fournir pour Rick Ta le regroupement texte/lieu/GPS avant toute publication.
5. Fournir le texte client de la page 404.
6. Arbitrer définitivement l'usage du bordeaux et des repères rouges.
7. Définir le signal de publication permettant d'afficher le chapitre II dans le menu de production seulement lorsqu'il sera rempli.

## FICHIERS MODIFIÉS PAR CETTE MISSION

- `app/series/rue/page.tsx`
- `app/series/rue/[slug]/page.tsx`
- `data/photos/rue.ts`
- `components/SiteHeader.tsx`
- `app/d-ou-je-viens/page.tsx`
- `app/globals.css`
- `RAPPORT_RETOURS_CLIENT_NOUVELLE_PHOTO.md`
