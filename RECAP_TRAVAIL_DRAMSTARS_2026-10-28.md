# DRAMSTARS — Récapitulatif du travail du 28 octobre 2026

Ce document est destiné à mettre à jour la conversation ChatGPT principale concernant le projet DRAMSTARS.

## Contexte

- Travail effectué sur la branche `dev-rue`.
- Les demandes proviennent du document de retours client du 21 octobre 2026 et du prompt d’intégration associé.
- Les nouveaux originaux photographiques ont été fournis dans les dossiers locaux `NewFiles/ZUP` et `NewFiles/LSB`.
- Aucun commit, aucun push et aucune fusion vers `main` n’ont été effectués pendant cette intervention.
- Les polices existantes du site n’ont pas été modifiées.

## 1. Import des nouvelles photographies ZUP et LSB

- Analyse des métadonnées EXIF des photographies fournies.
- Import de 16 photographies ZUP et 12 photographies LSB.
- Utilisation des coordonnées GPS EXIF comme source réelle des positions.
- Utilisation de `DateTimeOriginal` comme source de la date et de l’heure.
- Aucun fuseau horaire n’a été inventé lorsque celui-ci n’était pas présent dans les métadonnées.
- Arrondi des coordonnées publiques à quatre décimales directement dans les données générées.
- Vérification des coordonnées par rapport aux tableaux de contrôle du client.
- Création d’identifiants stables pour les 28 photographies.

Le nouvel import reproductible se lance avec :

```text
npm run import:photos
```

Les fichiers principaux sont :

- `scripts/import-photo-exif.mjs`
- `lib/photo-import.mjs`
- `data/generated/photo-map-points.json`
- `data/photo-map.ts`

## 2. Protection des originaux et confidentialité

- Les originaux Lightroom restent dans `NewFiles` et ne sont pas publiés.
- Le dossier `NewFiles` est maintenant ignoré par Git.
- Les originaux n’ont pas été modifiés.
- Création de 28 dérivés web JPEG sRGB dans :
  - `public/Photos/map/zup/`
  - `public/Photos/map/lsb/`
- Suppression des métadonnées EXIF, GPS, XMP et IPTC des fichiers destinés au site.
- Ajout d’un audit automatique des images publiques :

```text
npm run audit:public-media
```

Résultat réel : 196 images publiques analysées, sans champ de localisation détecté.

Le dossier local complet `maplibre-gl-js-main` est également ignoré par Git. L’application continue d’utiliser la dépendance MapLibre installée par npm et son worker local existant.

## 3. Nouvelle carte commune « Où je suis »

La page `/ou-je-suis` a été transformée en carte photographique commune.

Elle contient maintenant exactement :

- ZUP : 16 photographies ;
- LSB : 12 photographies ;
- RUE : 17 récits ;
- total : 45 contenus.

Le point d’origine et le marqueur de l’album collectif ne sont pas comptés dans les 45 contenus.

### Point d’origine

- La carte s’ouvre sur le point d’origine demandé.
- L’adresse postale n’est plus affichée ni utilisée dans les données courantes.
- La légende utilise uniquement « point d’origine » et ses coordonnées publiques.
- La carte ne fait plus de cadrage automatique de l’ensemble des points au chargement.
- Les contenus sont reliés au point d’origine par des traits représentant les déplacements.
- La distance reste affichée provisoirement, mais son activation est isolée dans le code car elle reste à valider avec Madou.

### Trois catégories visuelles

- Photographies personnelles ZUP/LSB : bordeaux.
- Récits RUE : noir.
- Lieu collectif : rouge orangé.

Pour ZUP et LSB, aucun prénom, blase, titre éditorial ou légende inventée n’est affiché. Les fiches montrent uniquement la série, un numéro technique, la date, l’heure et le bouton « Voir la photo ».

Les récits RUE conservent leurs blases, leurs images, leurs URL et le bouton « Voir le récit ».

## 4. Filtres, recherche et navigation

- Ajout des filtres Tous, ZUP, LSB et RUE.
- Affichage des quantités 45, 16, 12 et 17.
- La recherche par blase est disponible uniquement lorsque le filtre RUE est actif.
- La liste située sous la carte contient uniquement les 17 blases RUE.
- Les photographies ZUP et LSB ne sont plus présentées comme des personnes.
- L’ancienne URL `/series/rue/carte` redirige toujours vers `/ou-je-suis`.
- Cette ancienne URL ouvre désormais directement le filtre RUE grâce au paramètre `?series=rue`.
- Le menu contient un accès direct vers « Où je suis » et vers « D’où je viens ».

## 5. Apparence du fond cartographique

- Conservation de MapLibre.
- Conservation des attributions cartographiques obligatoires.
- Suppression des noms de rues, communes, pays et autres étiquettes du fond.
- Suppression des routes et des points d’intérêt commerciaux.
- Conservation du bâti, du végétal, de l’eau et de limites administratives discrètes.
- Conservation du style crème, noir et bordeaux de DRAMSTARS.
- Aucune modification générale de Courier Prime ou des autres règles typographiques.

Une ondulation lente a été ajoutée aux contours végétaux visibles. Elle :

- respecte `prefers-reduced-motion` ;
- s’arrête lorsque la carte n’est plus visible ;
- s’arrête lorsque l’onglet est masqué ;
- nettoie ses ressources au démontage.

Limite connue : le fournisseur cartographique ne fournit pas directement la géométrie exacte de l’intersection entre chaque zone bâtie et chaque zone végétale. L’animation actuelle concerne donc les contours végétaux visibles et ne doit pas être présentée comme une frontière géométrique parfaitement calculée entre les deux matières.

## 6. Fiches des points sur ordinateur

- Survol : aperçu léger avec vignette et informations essentielles.
- Clic : ouverture de la fiche complète.
- Une seule fiche complète reste ouverte à la fois.
- Le point sélectionné reste visuellement identifiable.
- La photographie apparaît derrière le texte avec une opacité proche de `0.4`.
- La fiche propose « Voir la photo », « Voir le récit » ou « Ouvrir l’album » selon la catégorie.
- La carte se déplace doucement du minimum nécessaire lorsqu’une fiche risque d’être coupée.
- Aucun changement automatique de zoom n’est effectué.
- Ajout de la gestion du clavier, du focus, d’Entrée, d’Espace et d’Échap.

## 7. Fiches sur smartphone et tablette

- Aucun survol n’est nécessaire sur un écran tactile.
- Un toucher sur un point ouvre un panneau en bas de l’écran.
- Le panneau contient une vignette, la date et l’heure disponibles et le bouton d’accès au contenu.
- Ajout de boutons précédent et suivant.
- Ajout du passage au point précédent ou suivant par glissement latéral.
- La navigation met maintenant à jour le marqueur sélectionné et la liaison correspondante.
- Le bouton de fermeture désélectionne correctement le point.
- Le panneau est rendu au-dessus de la carte pour éviter que celle-ci intercepte les touchers.
- Correction d’un débordement horizontal mobile provoqué par la carte.
- Correction de la lisibilité du texte dans le bouton noir « Voir la photo ».

## 8. Pages des photographies ZUP et LSB

- Création de pages statiques à l’adresse `/photographies/[series]/[id]`.
- Génération des 28 chemins correspondant aux nouvelles photographies.
- Présentation neutre sans titre éditorial ni légende inventée.
- Affichage de la photographie, de la date et de l’heure.
- Les galeries publiques ZUP et LSB utilisent désormais les dérivés web nettoyés.
- Les anciens textes de ZUP et LSB sont masqués publiquement sans supprimer ni écraser leurs fichiers de données existants.

## 9. Premier lieu collectif : Église Saint Paul

- Création du marqueur collectif demandé.
- Création de la page `/lieux/eglise-saint-paul`.
- Association des huit photographies indiquées dans le document client.
- Classement chronologique des photographies entre ZUP et LSB.
- Aucun titre ou récit supplémentaire n’a été inventé.

## 10. Correction du chargement des photographies

- Le fichier `lib/photo-files.ts` utilisait auparavant une recherche dynamique trop large dans les dossiers.
- Il a été remplacé par un manifeste statique limité aux fichiers réellement attendus.
- Les avertissements de compilation liés aux accès dynamiques ont disparu.

## 11. Refonte de la section « D’où je viens »

Le client demandait une carte indépendante consacrée à l’Afrique de l’Ouest, mais les coordonnées, l’origine du chapitre, les trajets et les données de matière ne sont pas encore fournis.

Une première base cartographique avait été ajoutée, mais sa présentation donnait l’impression d’une carte vide posée sans explication. Cette partie a donc été retravaillée aujourd’hui.

### Nouvelle présentation

- La section est maintenant présentée comme un « Atlas en construction ».
- Ajout du titre « Un territoire à documenter ».
- La carte est intégrée dans une composition éditoriale cohérente avec le site.
- Le fond situe uniquement l’Afrique de l’Ouest.
- La carte est volontairement non interactive tant qu’aucune donnée n’est publiée.
- Suppression des boutons de zoom inutiles dans cet état.
- Ajout d’une grille discrète, d’un encadrement d’archive et d’un traitement crème/noir/bordeaux.
- Ajout d’un message visible : « Aucun trajet ni lieu n’est encore publié ».
- Ajout des statuts :
  - périmètre : Afrique de l’Ouest ;
  - origine du chapitre : à valider ;
  - données photographiques : en attente ;
  - zéro point publié.
- Aucun point, trajet, lieu ou origine fictive n’a été ajouté.
- La page reste en `noindex` pendant sa construction.
- Le rendu a été contrôlé sur ordinateur et smartphone.

Fichiers concernés :

- `components/ChapterTwoMap.tsx`
- `app/d-ou-je-viens/page.tsx`

## 12. Tests et vérifications exécutés

Commandes réellement exécutées avec succès :

```text
npm run import:photos
npm run test:photos
npm run audit:public-media
npm run lint
npm run build
npm run test:browser
```

Résultats :

- import : 28 photographies importées, aucune anomalie ;
- tests de données : 3 tests réussis ;
- audit de confidentialité : 196 images publiques sans localisation détectée ;
- ESLint : aucune erreur et aucun avertissement ;
- TypeScript et build Next.js : réussis, 42 pages générées ;
- test navigateur Chrome : réussi sur ordinateur et interface tactile.

Le test navigateur contrôle notamment :

- les 28 marqueurs photographiques et les 17 marqueurs RUE ;
- le lieu collectif ;
- les filtres et la recherche RUE ;
- l’album de huit photographies ;
- les pages photo ;
- la redirection historique RUE ;
- le survol et le clic sur ordinateur ;
- le panneau tactile et sa navigation ;
- l’absence de faux point dans « D’où je viens » ;
- le rendu de la nouvelle section Afrique de l’Ouest sur ordinateur et smartphone.

## 13. Éléments encore en attente de Madou

- Décision définitive concernant l’affichage de la distance depuis l’origine.
- Choix des séries visibles par défaut au chargement de la carte commune.
- Validation du format provisoire des vignettes.
- Validation de points focaux manuels pour certaines photographies sensibles au recadrage.
- Données permettant de calculer exactement la frontière entre le bâti et le végétal.
- Coordonnées, origine, trajets, photographies, textes, scans et accords de publication du chapitre « D’où je viens ».
- Données fiables de végétation et de désertification pour le Sénégal et le Mali.
- Nouvelles couvertures RUE annoncées mais absentes des dossiers fournis.
- Version WebM de la vidéo Picsou/Koko non fournie.
- Six intitulés tronqués, texte de Rick Ta, décision concernant Sarah B., point non attribué, autres lieux collectifs, nouveaux textes ZUP/LSB, texte de la page 404 et photos d’ouverture de série.

## 14. État Git à connaître

- Branche active : `dev-rue`.
- Aucun commit ni push réalisé aujourd’hui.
- Les suppressions locales de `RAPPORT_INTEGRATION_RUE.md` et `RAPPORT_RETOURS_CLIENT_NOUVELLE_PHOTO.md` existaient avant l’intervention et n’ont pas été restaurées.
- Le fichier non suivi `RECAP_TRAVAIL_DRAMSTARS_2026-10-05.md` existait également avant l’intervention et n’a pas été modifié.
- Les dossiers privés `NewFiles` et `maplibre-gl-js-main` sont ignorés et ne doivent pas être ajoutés au commit.

## 15. Rapports complémentaires créés

- `RAPPORT_IMPORT_EXIF_2026-10-28.md` : détail de l’import des 28 photographies.
- `RAPPORT_REALISATION_RETOURS_2026-10-21.md` : checklist complète des demandes du document client.
- `RECAP_TRAVAIL_DRAMSTARS_2026-10-28.md` : présent récapitulatif destiné à ChatGPT.
