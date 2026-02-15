# Étude d'automatisation

## Sélection des tests

Pour la sélection des tests à automatiser, je préconise d'automatiser ceux liés aux entrées utilisateurs en priorité.
En effet, ils sont sources d'anomalies potentielles et il ne faut pas faire confiance à l'utilisateur.

Le site présente actuellement 2 formulaires :

- La prise de contact via la page contact
- Inscription à l'événement souhaité

Ils ont en commun le nom, le prénom, l'email qui sont des inputs à bien surveiller.
Puis chacun a ses propres champs comme le message pour la prise de contact et la date pour l'inscription de l'utilisateur.

Vient ensuite les tests de récupération de données comme les événements dans le sliders mais aussi le dernier événement en date dans le petit encart en bas à gauche. Ces tests sont préconisés car c'est la première chose que verra l'utilisateurs lorsqu'il se connectera sur le site web. C'est l'image de l'entreprise qui est en jeu.

Un autre point important est que ces tests sont facilement et rapidement automatisables.
Par exemple, une fois le formulaire passé en revue, on peut facilement supposer que tout ce qui n'est pas conforme au Happy Path est automatiquement rejetée.
Concernant, la récupération du dernier événement, c'est même encore plus simple et encore plus rapide.

### Les formulaires

#### Inscription

Le formulaire d'inscription est important pour le business. Il doit être impeccable.
Il ne doit "laisser trainer" aucune source potentielle de bug et pour cela, il doit être le plus "carré" possible.

##### Les éléments à tester

Hormis l'évidence que tous les champs sont à vérifier en frontend et en backend, une attention particulière doit être porté à la date.

En effet, celle-ci, si elle est mauvaise peut engendrer un refus d'accès à l'événement ce qui va agacer le consommateur et entâcher la réputation de l'entreprise.

Afin de réduire le champs des anomalies, on peut mettre en place un test automatisé pour le Happy Path avec strictement ce qui est accepté:

- Nom
  - Un nom peut avoir des tirets, des chiffres et de la ponctuation.
  - Un nom peut être long mais pas infini.
  - On peut donc définir une REGEX qui prend en compte les lettres de l'alphabet minuscules et majuscules, les nombres, l'apostrophe ainsi que les tirets accompagnés d'une limitation entre 1 (né sous X) et 50 caractères.
- Prénoms
  - Comme les noms, un prénom peut être long mais pas infini.
  - Un prénom peut avoir aussi une apostrophe, un tiret.
  - On peut donc implémenter une REGEX prenant en compte les lettres, les tirets, l'apostrophe et aussi limiter entre 2 et 50 caractères.
- Personnel/Entreprise
  - Même si le frontend force l'entrée "Personnel" ou "Entreprise", il faut quand même tester en backend.
- Email
  - Les mails suivent tous le même format et il existe même parfois une REGEX de validation intégré dans les frameworks frontend.
- Message
  - Les messages peuvent être long si une personne aime écrire.
  - Néanmoins, pour éviter du stockage inutile dans la BDD qui peut être payant selon le cas, on peut limter à 1200 caractères avec un petit encart qui indique le nombre de caractères restants.
- En commun
  - Ils peuvent tous être une entrée pour les personnes mal intentionnées.
  - Pour cela, les vérifications anti-XSS, anti-injections et autres sont à faire en backend pour ne pas informer la personne malveillante en faisant le check en frontend.
  - Ces informations peuvent être visible grâce aux outils de débuggage du navigateur et autres outils spécifiques.

##### Données de test

###### Valides

Les données de tests valides "par défaut" sont les suivantes:

- Nom : Anderson
- Prénom : Thomas
- Email : neo@matrix.com
- Date : celle de l'événement
- Message : "Bonjour, voici ma prise de contact."

Le `Body` de la requête POST Happy Path peut être le suivant:

```json
{
  "name": "Sophie",
  "surname": "Martin",
  "contactType": "Entreprise",
  "email": "sophie.martin@example.com",
  "message": "Demande de devis pour un séminaire."
}
```

###### Données invalides

Les données invalides quant à elle sont à générer ou à créer selon le cas:

- Éléments nécessitants des caractères non-latin : Google trad pour le chinois, le russe, l'indien...
- Grand nombre de caractères : ipsum.com
- Etc...

### Les events et dernier event

À l'inverse des formulaires d'inscription qui nécessitent des vérifications frontend et backend, on peut limiter ceux concernant les événements au périmètre de l'API.

Notre site internet n'empêchera pas l'utilisateur de mettre n'importe quoi dans l'url pour voir ce qui se passe.

#### Éléments à tester

La surface à tester est plus petite mais toute aussi importante.
Il faudra tester:

- Le Happy Path
- Un mauvais ID d'événement
- Un mauvais type de requête

##### Données de test

###### Données valides

Les données valides pour ce cas présents sont tout simplement un id valide:

- par exemple, celui du World Economic Forum : `698f14423b5820a033627329`
- le type de requête : GET

###### Données invalides

Les données invalides peuvent être:

- Un autre type de requête : POST, PUT, PATCH...
- Un id trop court : `123456789101112`
- Un id mal formaté : `zzzzzzzzzzzzzzzzzzzzzzzz`
