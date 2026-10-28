# DRAMSTARS — Rapport de réalisation des retours du 21 octobre 2026

Date de réalisation : 28 octobre 2026  
Branche de travail : `dev-rue`

Ce rapport décrit uniquement les éléments vérifiés dans le projet. Il ne contient ni origine privée, ni adresse postale, ni coordonnée EXIF non arrondie.

## 1. Résultat général

- Les 16 photographies ZUP et les 12 photographies LSB fournies ont été importées depuis leurs métadonnées EXIF.
- Les 28 positions et dates ont été contrôlées, puis des données publiques arrondies à quatre décimales ont été générées.
- Des dérivés web sRGB sans métadonnées EXIF, XMP, IPTC ou GPS ont été créés sans modifier les originaux.
- La carte commune « Où je suis » présente 45 contenus : 16 ZUP, 12 LSB et 17 RUE. Le point d’origine et le lieu collectif ne sont pas comptés dans ce total.
- La carte conserve l’origine commune, les traits de déplacement et trois catégories visuelles : photographies, récits et lieu collectif.
- Le premier album collectif, « Église Saint Paul », regroupe les huit photographies indiquées, classées chronologiquement.
- Les interactions ordinateur et tactiles ont été adaptées et vérifiées dans un navigateur réel.
- La typographie Courier Prime existante et l’identité crème, noire et bordeaux ont été conservées.

## 2. Checklist de correspondance

| Demande | Code ou données concernés | État et validation |
| --- | --- | --- |
| EXIF comme source | `scripts/import-photo-exif.mjs`, `lib/photo-import.mjs` | Réalisé. Import reproductible depuis `DateTimeOriginal` et GPS. Aucun fuseau horaire ajouté. |
| 16 ZUP, 12 LSB, 17 RUE | `data/generated/photo-map-points.json`, `app/ou-je-suis/page.tsx` | Réalisé. 45 contenus, hors origine et album. |
| Arrondi public à quatre décimales | `scripts/import-photo-exif.mjs` | Réalisé dans le fichier généré, et pas uniquement à l’affichage. |
| Originaux hors publication | `.gitignore`, dossier local `NewFiles` | Réalisé. Les originaux restent privés et ignorés par Git. |
| Dérivés sRGB nettoyés | `public/Photos/map/` | Réalisé. Contrôle automatique après génération. |
| Audit des images publiques | `scripts/audit-public-image-metadata.mjs` | Réalisé. 196 images publiques contrôlées, aucun champ de localisation détecté. |
| Origine sans adresse postale | `components/RueMap.tsx`, `app/ou-je-suis/page.tsx` | Réalisé. Seules les coordonnées publiques et le libellé « point d’origine » sont utilisés. |
| Ouverture centrée sur l’origine | `components/RueMap.tsx` | Réalisé. Aucun cadrage automatique de tous les points au chargement. |
| Liaisons avec l’origine | `components/RueMap.tsx` | Réalisé. Chaque contenu individuel est relié à l’origine ; l’album collectif n’ajoute pas une liaison artificielle. |
| Trois catégories | `components/RueMap.tsx`, `app/globals.css` | Réalisé avec trois couleurs et trois comportements éditoriaux distincts. |
| ZUP/LSB sans prénom, titre ou légende | carte et pages `/photographies/...` | Réalisé. Seuls série, numéro technique, date et heure sont affichés. |
| RUE inchangé | `data/photos/rue.ts`, carte commune | Réalisé sans réécrire les 17 récits ni leurs URL. |
| Album Église Saint Paul | `data/photo-map.ts`, `app/lieux/eglise-saint-paul/page.tsx` | Réalisé avec huit photos et ordre chronologique. |
| Filtres ZUP/LSB/RUE | `components/RueMap.tsx` | Réalisé. Comptages 16, 12 et 17. |
| Recherche et index réservés à RUE | `components/RueMap.tsx` | Réalisé. Recherche désactivée hors filtre RUE ; liste du bas limitée aux blases RUE. |
| Ancienne URL de carte RUE | `app/series/rue/carte/page.tsx`, `app/ou-je-suis/page.tsx` | Conservée. La redirection ouvre maintenant la carte commune directement filtrée sur RUE. |
| Fond sans noms, routes ou commerces | `components/RueMap.tsx` | Réalisé en retirant les symboles, routes et points d’intérêt du style MapLibre. Bâti, végétal, eau et limites fines sont conservés. |
| Aperçu ordinateur puis fiche complète | `components/RueMap.tsx`, `app/globals.css` | Réalisé. Survol léger, clic complet, image derrière le texte, fermeture cohérente et remplacement de la fiche précédente. |
| Navigation clavier | `components/RueMap.tsx` | Réalisé avec boutons natifs, focus, Entrée/Espace et Échap. |
| Fiche près des bords | `components/RueMap.tsx` | Réalisé. Déplacement minimal et doux de la carte, sans changement de zoom. |
| Panneau mobile/tablette | `components/RueMap.tsx`, `app/globals.css` | Réalisé. Toucher, vignette, fermeture, boutons précédent/suivant et glissement latéral. Le panneau est rendu au-dessus de la carte et ne crée plus de débordement horizontal. |
| Point mobile sélectionné | `components/RueMap.tsx` | Réalisé. La navigation précédente/suivante met aussi à jour le marqueur et la liaison sélectionnés. |
| Carte « D’où je viens » séparée | `components/ChapterTwoMap.tsx`, `app/d-ou-je-viens/page.tsx` | Squelette cartographique réalisé sans faux point. La page reste en `noindex`. Les données éditoriales et géographiques attendues manquent encore. |
| Textes ZUP et LSB masqués | `app/series/[slug]/page.tsx` | Réalisé côté public sans écraser les fichiers de données existants. |
| Accès dynamiques aux photos | `lib/photo-files.ts` | Corrigé avec un manifeste statique limité aux fichiers attendus ; les avertissements de build ont disparu. |
| Police du site | `app/layout.tsx` et styles existants | Préservée. Aucune refonte typographique générale. |

## 3. Import et confidentialité

Le nouveau flux se relance avec :

```text
npm run import:photos
```

Il effectue les contrôles suivants :

- présence exacte des 16 fichiers ZUP et 12 fichiers LSB ;
- présence du GPS et de `DateTimeOriginal` ;
- comparaison avec les tableaux de contrôle ;
- arrondi des données publiées ;
- conversion en JPEG sRGB ;
- suppression et vérification des métadonnées de localisation ;
- génération de `data/generated/photo-map-points.json` ;
- génération du rapport d’import `RAPPORT_IMPORT_EXIF_2026-10-28.md`.

L’ancien script KML est conservé uniquement pour ne pas supprimer arbitrairement un outil historique. Le nouveau flux photographique ne l’utilise pas.

## 4. Fichiers principaux ajoutés

- `scripts/import-photo-exif.mjs`
- `scripts/audit-public-image-metadata.mjs`
- `lib/photo-import.mjs`
- `data/generated/photo-map-points.json`
- `data/photo-map.ts`
- `public/Photos/map/zup/01.jpg` à `16.jpg`
- `public/Photos/map/lsb/01.jpg` à `12.jpg`
- `app/photographies/[series]/[id]/page.tsx`
- `app/lieux/eglise-saint-paul/page.tsx`
- `components/ChapterTwoMap.tsx`
- `tests/photo-import.test.mjs`
- `tests/browser-map.mjs`
- `RAPPORT_IMPORT_EXIF_2026-10-28.md`

## 5. Fichiers principaux modifiés

- `.gitignore`
- `package.json` et `package-lock.json`
- `app/ou-je-suis/page.tsx`
- `app/d-ou-je-viens/page.tsx`
- `app/series/[slug]/page.tsx`
- `app/globals.css`
- `components/RueMap.tsx`
- `components/SiteHeader.tsx`
- `lib/photo-files.ts`

Les deux rapports déjà supprimés localement avant cette mission n’ont pas été restaurés ni inclus volontairement dans le travail. Le dossier local `maplibre-gl-js-main/` n’a pas été ajouté au suivi.

## 6. Vérifications exécutées

- `npm run import:photos` : réussi, 28 photographies importées, aucune anomalie.
- `npm run test:photos` : réussi, 3 tests sur l’arrondi, la date sans fuseau inventé et l’ordre des fichiers.
- `npm run audit:public-media` : réussi, 196 images publiques contrôlées sans champ de localisation détecté.
- `npm run lint` : réussi sans erreur ni avertissement.
- `npm run test:browser` : réussi dans Chrome sur un parcours ordinateur et un parcours tactile.
- Le parcours navigateur vérifie notamment les 45 contenus, les filtres, la recherche RUE, l’album de huit photos, les pages photo, la redirection historique, le survol ordinateur, le clic, le panneau tactile et l’absence de faux point dans le chapitre II.
- `npm run build` : réussi lors de la validation finale, avec vérification TypeScript et 42 pages générées.

## 7. Écarts et blocages réels

### Animation entre bâti et végétal — partielle

Une ondulation lente des contours végétaux visibles est en place. Elle respecte la réduction de mouvement, s’arrête lorsque la carte ou l’onglet ne sont pas visibles et nettoie ses ressources. Le fond public utilisé ne fournit toutefois pas une géométrie calculée de l’intersection exacte entre chaque zone bâtie et chaque zone végétale. Cette animation ne doit donc pas encore être déclarée totalement conforme à la formulation « frontière entre les matières ».

### Chapitre II — données manquantes

La carte Afrique de l’Ouest existe, sans étiquette ni faux point, mais les éléments suivants ne sont pas disponibles : origine validée, points, textes, scans de lettre, accords de publication et surfaces fiables de végétation/désertification au Sénégal et au Mali. Aucune précision fictive n’a été ajoutée.

### Textes ZUP et LSB

Les fichiers de données existants ont été préservés et les textes sont masqués publiquement. Une sauvegarde WordPress originale et vérifiable à quatre champs n’était pas disponible dans les fichiers fournis ; rien n’a donc été écrasé.

### Cadrage automatique

Le composant accepte une surcharge manuelle `focalPoint`, avec un cadrage central provisoire par défaut. Aucune véritable détection automatique de visage n’a été inventée. Une validation visuelle image par image reste nécessaire si Madou souhaite des points focaux particuliers.

### Vignettes

Le format technique provisoire est de 480 × 320 pixels, ratio 3:2, centralisé dans le flux d’import. Il reste à valider éditorialement.

### Médias supplémentaires

- Les neuf nouvelles couvertures RUE annoncées n’étaient pas présentes dans `NewFiles`.
- Une source MP4 Picsou/Koko existe déjà dans le projet ; aucun fichier WebM correspondant n’a été fourni dans les nouveaux dossiers.
- Aucun média sans correspondance certaine n’a été substitué.

## 8. Décisions et contenus encore attendus de Madou

- Validation ou retrait de l’affichage de la distance depuis l’origine. Le réglage reste isolé dans la carte.
- Choix définitif des séries visibles au premier chargement. La valeur actuelle reste « toutes » et peut être changée à un seul endroit ; l’ancienne URL RUE force seulement le filtre RUE.
- Validation du format de vignette provisoire.
- Validation de points focaux manuels pour les recadrages sensibles.
- Données exactes nécessaires à l’animation de frontière bâtie/végétale si une conformité géométrique stricte est exigée.
- Données, textes et accords du chapitre II.
- Six intitulés tronqués, texte de Rick Ta, décision concernant Sarah B., rattachement du point encore non attribué, autres lieux collectifs, nouveaux textes ZUP/LSB, texte 404 et photos d’ouverture de série.

## 9. Commandes utiles

```text
npm install
npm run import:photos
npm run audit:public-media
npm run test:photos
npm run lint
npm run build
npm run dev
npm run test:browser
```

Le test navigateur nécessite que le serveur local soit déjà disponible sur `http://localhost:3000` et que le fond OpenFreeMap soit accessible.
