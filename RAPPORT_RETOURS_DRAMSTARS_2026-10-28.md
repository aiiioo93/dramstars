# DRAMSTARS — Rapport d’intégration des retours du 28/10/2026

Intervention réalisée le 1er novembre 2026 sur la branche `dev-rue`, sans commit, push, merge ni déploiement.

## Synthèse

| Demande | État | Réalisation / limite | Fichiers principaux |
|---|---|---|---|
| Nom PsychoKarta | Réalisée | Nom uniformisé dans l’interface et les métadonnées concernées. | `app/ou-je-suis/page.tsx`, `components/SiteHeader.tsx`, `app/page.tsx` |
| Futurs tracés réels | Bloquée par les données | Aucun parcours inventé. Les liaisons droites restent seulement des « départs depuis le point d’origine », sans être présentées comme des rues parcourues. Les tracés validés restent à fournir. | `components/RueMap.tsx` |
| Accueil | Réalisée | Diaporama et titre conservés ; compteurs et mention basse retirés ; blocs ZUP/LSB/RUE masqués ; aperçu statique réel de la PsychoKarta et bouton unique ajoutés. | `components/HeroCarousel.tsx`, `app/page.tsx`, `public/Photos/psychokarta-preview.png` |
| Logo du menu | Bloquée par le média | Aucun logo fiable trouvé. Le déclencheur carré accessible est conservé sans recréer le logo. | `components/SiteHeader.tsx` |
| Biographie | Réalisée | Mentions sous portrait retirées, crédit `© Camille Haddad` conservé, accès renommé « Mon histoire ». | `app/page.tsx`, `app/histoire/page.tsx` |
| Menu | Réalisée | Panneau simplifié, fond gris issu de la palette existante, carré unique, Chapitre I, Où je suis, accès directs ZUP/LSB/RUE, Mon histoire ; D’où je viens masqué ; anciens ornements supprimés. | `components/SiteHeader.tsx` |
| En-tête Où je suis | Réalisée | Textes techniques et suffixes retirés ; Chapitre I et trait conservés. | `app/ou-je-suis/page.tsx` |
| Points et état initial | Réalisée | Toutes les séries visibles au départ ; aucun chiffre dans les marqueurs ; noms accessibles conservés ; distance retirée des fiches et du panneau tactile. | `components/RueMap.tsx`, `app/globals.css` |
| Palette | Réalisée | ZUP `#0a0a0a`, LSB `#65345f`, RUE `#ad681f`, UMC `#963a2c`. Formes distinctes en complément de la couleur. Contrastes sur crème : 17,83 / 8,56 / 3,96 / 6,44. | `app/globals.css` |
| Dates | Réalisée | Formateur central : `date à 03h47`, sans heure fictive lorsqu’elle manque. | `lib/photo-display.ts` et pages photo/récit/album/carte |
| Filtres | Réalisée | Quatre commandes ZUP/LSB/RUE/UMC sans compteurs ni bouton Tous. Un second clic sur le filtre actif revient à la vue générale. Recherche RUE préservée uniquement dans RUE. | `components/RueMap.tsx` |
| Liste des blases | Réalisée | Retirée du DOM, donc inaccessible au clavier ; données RUE conservées. | `components/RueMap.tsx` |
| UMC | Réalisée | Liste déroulante extensible, Église Saint-Paul à `48.9470, 2.5095`, huit associations existantes réutilisées, zoom, grand nom responsive, révélation des huit photos et retour général. Album complémentaire conservé et renommé UMC. | `components/RueMap.tsx`, `app/ou-je-suis/page.tsx`, `app/lieux/eglise-saint-paul/page.tsx` |
| Sang titre | Réalisée | Registre permanent commun ZUP/LSB de 1 à 28 ; ordre initial EXIF chronologique ; égalités départagées par identifiant stable ; tout nouvel identifiant exige une attribution explicite et ne renumérote rien. | `data/photo-number-registry.json`, `data/photo-map.ts`, `lib/photo-import.mjs`, `scripts/import-photo-exif.mjs` |
| Anciens textes IA | Réalisée pour l’affichage / restauration bloquée | Textes de refonte sauvegardés et non affichés sur les pages publiques ZUP/LSB. Les originaux WordPress ne sont pas présents : aucune reconstruction inventée. | `data/backups/series-copy-before-2026-10-28.json`, `app/series/[slug]/page.tsx` |
| Périodes et crédits | Réalisée | ZUP 2011→2017 avec trois crédits au même niveau ; LSB fin 2017→été 2022 avec Martine Ravache ; RUE rentrée 2022→en cours. | `lib/series.ts`, pages série |
| Respiration bâti/végétal | Partielle | L’animation existante a été rendue perceptible, ralentie sur plusieurs secondes, limitée lorsque visible, suspendue onglet masqué, désactivée avec réduction des mouvements et nettoyée au démontage. Le fond distant expose des polygones de végétation et de bâti séparés, mais aucune géométrie précalculée de leur frontière commune : l’effet porte encore sur les limites végétales disponibles et ne peut pas être présenté comme la frontière exacte. Une couche vectorielle validée de cette frontière est nécessaire. | `components/RueMap.tsx` |
| Sarah B. | Bloquée par le texte/validation | Cinq images existent, mais aucun récit réel ni couverture validée n’a été trouvé. Aucun faux 18e récit ajouté. | `public/Photos/series/rue/sarah-besnainou/` |
| Piksoo Koko Caramelo | Réalisée | Image fixe maintenue sur la carte ; page récit limitée à la vidéo MP4 disponible ; les 14 photos ne sont plus affichées mais les sources restent physiquement présentes. | `data/photos/rue.ts`, `app/series/rue/[slug]/page.tsx` |
| Rick Ta | Bloquée par le texte | Trois images existent, aucun texte réel trouvé ; aucune fiche inventée. | `public/Photos/series/rue/rick-ta/` |
| Mon histoire | Réalisée | Renommage et liens effectués, contenu authentique actuel préservé, aucun faux blog ou billet ajouté. | `components/SiteHeader.tsx`, `app/histoire/page.tsx`, redirection `/a-propos` existante |
| Chapitre II | Réalisée pour la présentation / contenu bloqué | Entrée masquée et `noindex` conservé. Statut de lettre placé avant la carte ; faux fac-similé masqué ; carte blanche sans grille, texture, pli ni bloc « Atlas en construction ». Aucun point fictif. Lettre réelle absente. | `app/d-ou-je-viens/page.tsx`, `components/ChapterTwoMap.tsx` |
| Thaïlande | Bloquée par les médias | Aucune route ni donnée Thaïlande exploitable trouvée ; aucun code d’accès à retirer et aucune sélection de bars inventée. | — |
| Page 404 | Reportée | Non modifiée conformément à la demande. | — |

## Vérifications exécutées

- `npm run lint` : réussi, aucune erreur ni avertissement final.
- `npx tsc --noEmit` : réussi.
- `npm run test:photos` : 5 tests réussis, incluant stabilité du registre, égalité de dates et ajout ultérieur d’une photo plus ancienne.
- `npm run audit:public-media` : 196 images publiques contrôlées, aucun champ GPS/EXIF/XMP/IPTC de localisation détecté.
- `npm run build` : build Next.js réussi, 42 pages générées.
- `npm run test:browser` : réussi sur contextes ordinateur et tactile après adaptation aux nouvelles règles.
- Contrôle visuel direct à 390 × 844 : quatre commandes, marqueurs sans chiffres, menu sans Chapitre II, UMC avec 8 photos, grand nom, retour général, aucun débordement horizontal.
- Contrôle visuel desktop : carte chargée, toutes les séries visibles, attributions MapLibre/OpenFreeMap/OpenMapTiles/OpenStreetMap conservées.

## Preuves visuelles

- `preuves/psychokarta-desktop.png`
- `preuves/psychokarta-umc-mobile.png`
- `public/Photos/psychokarta-preview-clean-2026-11.png` (capture statique réelle utilisée sur l’accueil, nom renouvelé pour éviter l’ancien cache)

## Fichiers encore attendus de Madou

- logo d’origine PNG ou JPEG ;
- tracés réels des rues parcourues et références situationnistes ;
- couche ou données validées permettant de calculer la frontière exacte bâti/végétal ;
- liste complète des UMC et associations fiables ;
- texte réel et couverture validée de Sarah B. ;
- texte réel de Rick Ta ;
- neuf couvertures RUE en 3:4, 900 × 1200 px, sRGB ;
- quatre champs WordPress originaux de ZUP et LSB ;
- lettre réelle du chapitre II et validations familiales ;
- médias Thaïlande identifiés et validés.

## Choix à valider

- Fond du menu proposé : gris minéral `#c9c6bd`, déjà cohérent avec les teintes cartographiques du site.
- Retour à toutes les séries : second clic sur le filtre ZUP, LSB ou RUE déjà actif ; le bouton « Vue générale » assure le retour après une UMC.
- Recherche RUE conservée, car elle recherche un nom sans créer de filtre individuel permanent.

## État Git

Le travail reste non commité sur `dev-rue`. Les suppressions préexistantes de `RAPPORT_INTEGRATION_RUE.md` et `RAPPORT_RETOURS_CLIENT_NOUVELLE_PHOTO.md`, ainsi que le fichier préexistant non suivi `RECAP_TRAVAIL_DRAMSTARS_2026-10-05.md`, n’ont pas été restaurés ni modifiés pendant cette intervention.

## Correction complémentaire — lisibilité des survols

- Audit des contrôles utilisant un fond noir ou sombre au survol sur l’ensemble des pages et composants.
- Sécurité CSS globale ajoutée pour maintenir le texte, les flèches et les éléments enfants en crème sur tout lien ou bouton passant sur un fond noir.
- États `hover`, `active` et `focus-visible` couverts pour ordinateur, écran tactile et clavier.
- Bouton PsychoKarta de la page RUE harmonisé avec un état de focus explicite.
- Contrôles après correction : lint, TypeScript et test navigateur ordinateur/tactile réussis.

## Correction complémentaire — débordement des marqueurs

- Le cadre MapLibre et son conteneur visuel découpent désormais strictement leur contenu avec `overflow: hidden`.
- Lors d’un zoom ou d’un déplacement, les marqueurs hors champ ne peuvent plus apparaître en dehors de la PsychoKarta.
- Le repositionnement automatique des fiches reste actif afin de les maintenir dans la zone visible.
- La bande « Point d’origine / départs depuis le point d’origine » possède maintenant son propre niveau d’affichage opaque. La zone MapLibre démarre strictement sous cette bande et utilise une isolation de peinture : points, traits et fiches ne peuvent plus la recouvrir.

## Correction complémentaire — crédits cartographiques

- Logo visuel MapLibre retiré des cartes.
- Attributions OpenFreeMap, OpenMapTiles et OpenStreetMap conservées pour respecter leurs licences, mais repliées par défaut dans le petit contrôle d’information.
- Les textes de crédit ne sont donc plus affichés en permanence et restent consultables au clic.
- L’aperçu statique de la page d’accueil a été recapturé après cette correction : il reprend le nouveau rendu sans logo ni crédits développés.
