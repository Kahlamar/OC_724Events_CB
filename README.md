# Read me

## Lancer le projet

Pour lancer le projet, assurez-vous d'avoir les éléments suivants installés:

- docker, [téléchargeable
  ici](https://docs.docker.com/desktop/setup/install/windows-install/)
- Un navigateur web
- Une connexion internet
- Un terminal accessible
- Le lien .git du repo hébergé sur Github : [ici](https://github.com/OpenClassrooms-Student-Center/724-events-testeur-logiciel)

### Procédure

Pour lancer le projet:

1. Ouvrir le terminal dans le dossier de destination
2. Lancer la commande suivante qui va cloner le code
   ```bash
   git clone "https://github.com/OpenClassrooms-Student-Center/724-events-testeur-logiciel.git"
   ```
3. Une fois le repo téléchargé, lancer cette fois-ci la commande docker, toujours dans le même dossier:

```bash
docker compose up --build
```

4. Attendre une petite minute puis se rendre sur le [site web](http://localhost:3000/) de 724events.

## Lancement des tests

Pour lancer les tests, assurez-vous d'avoir les éléments suivants installés:

- Docker car Cypress aura besoin que les containers fonctionnent pour accéder au site web.
- Un navigateur web
- Une connexion internet
- Un terminal accessible
- NodeJs, installable [ici](https://nodejs.org/en/download)
- Cypress, installable en lançant la commande suivante à la racine du repo avec NodeJs obligatoirement installé : `npm install cypress`

Une fois les éléments ci-dessus installés, lancer la commande qui va lancer l'interface de cypress: `npx cypress open`.
Les tests seront visibles dans la section `Specs`.
Pour en lancer un, cliquer sur le test souhaité ou lancer la commande `npx cypress run`.

## Génération du rapport

Pour générer le rapport des tests:

1. Lancer la commande suivante pour initier le projet NodeJS si ce n'est pas déja fait : `npm init`
2. Installer le package NodeJs pour la génération de rapport avec la commande suivante : `npm install --save-dev cypress-mochawesome-reporter`
3. Modifier le fichier de configuration (cypress.config.js) à la racine du repo pour qu'il prenne en compte le nouveau package. Ce fichier doit ressembler à ceci:

```js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
```

4. Modifier le fichiers `cypress/support/e2e.js` et y ajouter à la fin la ligne suivante : `import "cypress-mochawesome-reporter/register";`
5. Lancer les tests avec la commande : `npx cypress run`
6. Puis ouvir avec le nvagiateur le fichier html à l'emplacement : `cypress/reports/html/index.html` (dans le repo où est installé Cypress)
