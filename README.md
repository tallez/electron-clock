# Présentation

Ce dépôt héberge une application ElectronJS qui permet de gérer des alarmes. L'application est conçue pour être facile à utiliser et pour vous aider à vous rappeler des trucs.

# Installation

Pour installer et tester l'application, veuillez suivre les étapes suivantes :

1. Clonez ce repository dans votre ordinateur.
2. Ouvrez le dossier principal de l'application dans votre terminal.
3. Exécutez la commande `npm install` pour installer les dépendances nécessaires.
4. Exécutez la commande `npm run init-database` pour initialiser la base de données.

# Lancement

Pour lancer l'application, veuillez suivre les étapes suivantes :

1. Ouvrez le dossier principal de l'application dans votre terminal.
2. Créez un fichier .env et copiez le contenu de .env.example à l'interieur.
3. Exécutez la commande `npm start` pour lancer react.
4. Dans un nouveau terminal, executez `npm run electron-dev` pour lancer l'application Electron.

# Utilisation

L'utilisation de l'application est assez intuitive. Pour créer une nouvelle alarme, appuiez sur le + à droite du titre alarm dans le coin supérieur gauche de l'écran, puis renseignez les champs.

Vous pouvez activer ou désactiver une alarme en cliquant sur l'interupteur de celle-ci.

Lorsqu'une alarme se déclenche, appuiez sur Snooze pour l'éteindre.

# Améliorations

L'application actuelle permet de créer des alarmes et de les supprimer facilement. Cependant, il y a des améliorations possibles pour rendre l'application encore plus utile et pratique. Voici quelques idées d'améliorations possibles :

- Alarme personnalisée : permettre à l'utilisateur de choisir la musique de son choix depuis YouTube en utilisant l'API YouTube pour obtenir le fichier son depuis l'URL de la video
- Modification des alarmes existantes : permettre à l'utilisateur de modifier le nom et l'heure des alarmes existantes.

# Contributions

Les contributions sont les bienvenues pour améliorer cette application. Si vous avez des idées d'amélioration ou si vous souhaitez contribuer au code, n'hésitez pas à créer une pull request.
