# DRAMSTARS — État de la carte centrale MapLibre

Date : 5 octobre 2026  
Branche de travail : `dev-rue`

## Ce qui est en place

- La carte n'est plus une rubrique séparée de RUE : elle se trouve sur `/ou-je-suis`.
- L'ancienne URL `/series/rue/carte` redirige vers cette carte centrale avec le filtre RUE.
- Le moteur est **MapLibre GL JS 6.12** et le fond vient d'**OpenFreeMap**. Aucune clé Google n'est utilisée.
- Les noms de villes, rues, routes, pays, commerces et points d'intérêt sont retirés du fond.
- Seuls le bâti, le végétal, l'eau très discrète et les frontières administratives fines sont conservés.
- Le rendu reprend le noir et le crème du site. Les polices générales n'ont pas été modifiées.
- Sur ordinateur, le bâti et le végétal bougent très lentement de quelques pixels. Cette animation est désactivée sur petit écran et avec `prefers-reduced-motion`.
- Toutes les anciennes lignes en étoile ont été retirées : leur sens doit d'abord être validé par Madou.

## Confidentialité

- L'adresse personnelle précédemment associée au point d'origine a été supprimée de l'affichage, des données et du code.
- Le point reste présent sous le seul nom **« Point d'origine »**.
- Ses coordonnées sont arrondies à quatre décimales.
- Aucun lieu n'est nommé sur la carte.
- Les coordonnées ne sont pas répétées dans l'index des personnes situé sous la carte.

## Points et interactions

- Les récits RUE disponibles sont placés avec leurs coordonnées réelles.
- Un survol, un focus ou un toucher ouvre une infobulle avec le nom, la coordonnée arrondie et le lien **« Voir le récit »**.
- L'infobulle affiche un aperçu de l'image : bandeau en arrière-plan sur ordinateur, vignette sur mobile.
- Le composant sait aussi afficher une photographie ZUP/LSB avec un style distinct et le bouton **« Voir la photo »**.
- Plusieurs noms peuvent être associés à une photographie de groupe ; les quatre premiers sont affichés puis un indicateur `+N`.
- Un réglage manuel `focalPoint` est prévu pour corriger le cadrage d'un aperçu.

## Navigation et filtres

- Le menu Explorer ouvre directement **« Où je suis »**.
- ZUP, LSB et RUE sont maintenant des filtres de la carte, pas trois entrées de menu séparées.
- Une recherche par nom et un index des personnes sont présents.
- Les filtres ZUP et LSB sont visibles mais indiqués **« à venir »** tant que leurs coordonnées ne sont pas fournies.
- « D'où je viens » et « La lettre » sont retirés du menu jusqu'à la publication du chapitre.

## Contenus éditoriaux

- Les titres, légendes, lieux et descriptions provisoires générés pour ZUP et LSB ne sont plus affichés.
- Les données existantes n'ont pas été effacées, afin de ne rien perdre avant l'arrivée des textes originaux.
- Les pages photo ZUP/LSB affichent seulement un numéro d'archive, la date et l'heure.
- Les couvertures RUE sont affichées sans recadrage automatique afin de respecter les futurs exports 3:4 de Madou.
- Le compteur fixe « 17 récits publiés » n'est plus affiché.

## Chapitre II

- Le chapitre et la lettre restent en `noindex` et ne figurent pas dans le menu.
- Après la section 1999–2001, un emplacement explicite prépare la future carte des archives numériques de 2013 et après.
- Cet emplacement n'invente aucun point : il attend les KML et les photographies validées.
- Les territoires ne seront pas nommés ; le Mali et le Sénégal devront apparaître sur une seule carte.

## Import KML prêt

La commande suivante convertit un export KML en JSON et arrondit les coordonnées dès l'import :

```bash
npm run import:kml -- chemin/points.kml chemin/points.json
```

Le script se trouve dans `scripts/import-kml-points.mjs`.

## Fichiers principaux

- `app/ou-je-suis/page.tsx` — page de la carte centrale.
- `components/RueMap.tsx` — carte, filtres, recherche, points et infobulles.
- `app/globals.css` — apparence MapLibre et comportement responsive.
- `components/SiteHeader.tsx` — menu Explorer simplifié.
- `app/series/rue/carte/page.tsx` — redirection de l'ancienne adresse.
- `scripts/import-kml-points.mjs` — conversion des futurs KML.

## Éléments encore attendus de Madou

- le KML complet de RUE ;
- les KML de test ZUP et LSB avec les noms associés aux photographies ;
- les coordonnées et photographies numériques du chapitre II ;
- les neuf couvertures RUE corrigées en 3:4, 900 × 1200, sRGB ;
- les textes originaux de ZUP et LSB ;
- l'orthographe définitive du récit vidéo et le choix d'une vignette fixe ou animée ;
- la règle éventuelle des futures liaisons entre les points.

## Vérifications

- lint : réussi ;
- compilation de production : réussie ;
- ancienne URL redirigée : vérifiée ;
- interactions carte, recherche et infobulles : vérifiées ;
- affichage ordinateur et smartphone : vérifié ;
- aucune adresse personnelle trouvée dans le code du site.

Le dossier local `maplibre-gl-js-main/` contient la copie téléchargée du dépôt MapLibre. Il n'est pas nécessaire au site et ne doit pas être inclus dans un commit.
