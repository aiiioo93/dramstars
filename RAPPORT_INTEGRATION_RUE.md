# DRAMSTARS — Rapport d’intégration de la série RUE

## État général

- Branche de travail : `dev-rue`
- Branche `main` : non modifiée
- Récits publiés : **17**
- Récits non publiés : **2**
- Dossiers de personnes inspectés et préparés : **19**
- Photos copiées : **81**
- Dossier source `/RUE` : conservé intact et volontairement exclu du commit

## Intégration des contenus

Le PDF client `RUE/RUE TEXTE + GPS.pdf` a été vérifié visuellement et extrait page par page. La correspondance entre le PDF et les dossiers photo a été effectuée avec le numéro de chaque entrée, et non uniquement avec le nom.

Les récits exploitables ont été ajoutés dans `data/photos/rue.ts` avec :

- le nom tel qu’il apparaît dans le PDF ;
- les coordonnées GPS réelles ;
- le texte original, sans réécriture éditoriale ;
- les vrais paragraphes lorsqu’ils étaient identifiables ;
- les champs `date` et `heure` optionnels et laissés absents ;
- une couverture correspondant toujours à la première image après tri naturel ;
- des textes alternatifs sobres et numérotés.

Le récit de démonstration et ses trois images ont été supprimés.

## Organisation des photographies

Les photos ont été copiées, jamais déplacées, depuis `/RUE` vers :

```text
public/Photos/series/rue/<slug>/
```

Dans chaque dossier, elles ont été triées naturellement et renommées `01.jpg`, `02.jpg`, etc. Les 81 copies ont été comparées aux fichiers source avec SHA-256 : toutes sont identiques.

| Nº | Dossier public | Photos | Publication |
|---:|---|---:|---|
| 1 | `gueule-grande` | 4 | Publié |
| 2 | `fresh-oklm` | 3 | Publié |
| 3 | `kix-ra` | 4 | Publié |
| 4 | `ohdaeshoe` | 4 | Publié |
| 5 | `rick-ta` | 3 | À valider |
| 6 | `piksoo-koko-caramelo` | 14 | Publié |
| 7 | `s-m-e-g-o` | 2 | Publié |
| 8 | `nakmuay-issa` | 3 | Publié |
| 9 | `lila-bim` | 5 | Publié |
| 10 | `them-them` | 3 | Publié |
| 11 | `chrystelle-arnaud` | 6 | Publié |
| 12 | `manela-alma-v` | 4 | Publié |
| 13 | `tony-demarle` | 3 | Publié |
| 14 | `fuzi-baptista` | 3 | Publié |
| 15 | `wombat-in-wonderland` | 4 | Publié |
| 16 | `doums1982` | 2 | Publié |
| 17 | `sarah-besnainou` | 5 | À valider |
| 18 | `gueuledange` | 7 | Publié |
| 19 | `nadia-boucheni` | 2 | Publié |

## Informations encore manquantes

### Sarah B

Le PDF contient uniquement la mention `texte manquant`. Les cinq photos sont prêtes, mais le récit n’est pas publié. Il faut récupérer son témoignage définitif.

### Rick Ta

Le PDF contient trois parties :

- `GRAND PARIS EXPRESS`
- `LE PARKING`
- `LA BOULE`

Une seule coordonnée GPS apparaît, sous la première partie. Il faut confirmer si ce GPS correspond aux trois textes ou fournir une coordonnée pour chaque lieu. Les trois photos sont prêtes, mais le récit reste non publié afin de ne pas inventer d’association.

## Différences de noms constatées

Les noms affichés suivent le PDF, tandis que les slugs suivent les vrais noms des dossiers source.

- `Gueule Grande` → `Gueulle Grande`
- `Fresh OKLM` → `Fresh Oklm`
- `Ohdaeshoe` → `Ohdaesho`
- `S.M.E.G.O` → `SMEGO`
- `Wombat in Wonderland` → `Wombat In wonderland`
- `Doums1982` → `Doums 1982`
- `Sarah Besnainou` → `Sarah B`
- `GueuledAnge` → `Gueule D’Ange`

## Page principale `/series/rue`

La page affiche uniquement les 17 récits publiables.

Améliorations réalisées :

- grille responsive conservée : 2 colonnes sur mobile, 3 sur tablette et 4 sur desktop ;
- décalage vertical des colonnes conservé ;
- compteur `17 récits publiés` agrandi et mis en avant ;
- coordonnées GPS agrandies ;
- animation discrète appliquée directement aux chiffres des coordonnées ;
- prise en charge de `prefers-reduced-motion` ;
- bouton `Voir la carte` rendu plus visible ;
- bouton compact et aligné à droite sur smartphone ;
- couleur normale gris chaud/sable avec texte noir ;
- survol rouge DRAMSTARS `#ff3b18` avec texte noir lisible.

## Pages individuelles `/series/rue/[slug]`

Le design RUE distinct de ZUP et LSB a été conservé et complété :

- nom de la personne très visible ;
- coordonnées GPS mises en avant ;
- toutes les photographies du récit ;
- première photographie utilisée comme couverture ;
- section de parole bordeaux `#713126` ;
- repères rouges ;
- date et heure affichées uniquement lorsqu’elles existent ;
- aucun contenu fictif ou valeur de remplacement.

## Carte `/series/rue/carte`

La carte a été transformée en carte psychogéographique inspirée de Guy Debord, sans Google Maps, OpenStreetMap, Mapbox ni fond cartographique classique.

Éléments réalisés :

- positionnement calculé depuis les vraies coordonnées GPS ;
- nord en haut, sud en bas, ouest à gauche et est à droite ;
- distances relatives conservées ;
- fond crème éditorial, grille discrète et contours territoriaux abstraits ;
- palette crème, noir, bordeaux et rouge DRAMSTARS ;
- aucune ligne entre les récits ;
- vue générale du territoire ;
- agrandissement de la zone dense de Sevran afin de rendre les points proches accessibles ;
- nom et coordonnées au survol ou au focus ;
- chaque point renvoie vers son récit ;
- index responsive des 17 récits sous la carte ;
- numéro, nom, coordonnées et flèche explicitement rendus blancs ou clairs sur le fond noir au survol ;
- bouton `Retour RUE` avec écriture blanche sur fond noir au survol.

## Menu principal

Le déclencheur desktop `Explorer` n’est plus un lien vers une page susceptible de produire une erreur 404.

- le survol ouvre toujours le menu ;
- le clic ouvre et verrouille le menu ;
- un second clic le referme ;
- un clic extérieur ou la touche `Échap` ferme le menu ;
- les attributs d’accessibilité `aria-expanded` et `aria-controls` sont présents.

## Anciennes images RUE

Les anciennes images placées directement dans `public/Photos/series/rue/` (`RUE.jpg`, `RUE-2.jpg`, etc.) ne sont pas utilisées par la nouvelle intégration. Elles ont été laissées en place par prudence.

## Vérifications effectuées

- `npm run lint` : réussi
- `npm run build` : réussi
- TypeScript : réussi pendant le build
- 81 images sources présentes après la copie
- 81 images publiques vérifiées comme de vrais JPEG
- 81 copies vérifiées à l’identique par SHA-256
- 17 slugs publiés, sans doublon
- aucun récit publié sans GPS ou sans texte
- aucune fausse date `00/00/0000`
- aucune fausse heure `00h00`
- aucun chemin du site ne pointe vers `/RUE`
- aucun récit de démonstration
- `/series/rue` : HTTP 200
- `/series/rue/carte` : HTTP 200
- 17 liens de récits uniques présents dans la carte
- plusieurs pages individuelles testées en HTTP 200

Le build conserve quatre avertissements Turbopack préexistants dans `lib/photo-files.ts` à propos d’accès dynamiques au système de fichiers. Ils concernent les routes historiques et ne bloquent pas la compilation.

## Fichiers de code concernés

- `data/photos/rue.ts`
- `app/series/rue/page.tsx`
- `app/series/rue/[slug]/page.tsx`
- `app/series/rue/carte/page.tsx`
- `components/SiteHeader.tsx`
- `app/globals.css`

## Pour reprendre le travail

1. Rester sur la branche `dev-rue`.
2. Ne pas fusionner vers `main` sans validation explicite.
3. Récupérer le texte de Sarah B.
4. Clarifier les coordonnées et la structure du récit de Rick Ta.
5. Ajouter ces deux récits dans `data/photos/rue.ts` uniquement après validation des informations.
6. Relancer `npm run lint` et `npm run build`.
