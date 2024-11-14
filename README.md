# socialMedia
Local mini-social network project

## Description
Ce projet est un mini-réseau social en local, construit avec les technologies HTML, CSS et JavaScript pur. 
L'interface utilise un style neumorphisme pour offrir une expérience visuelle douce et harmonieuse. 
L'application est responsive, et la gestion des classes CSS est optimisée pour garantir une structure bien organisée et facile à maintenir.

## Objectifs
- Créer une interface utilisateur agréable et ergonomique en neumorphisme.
- Dynamiser l'interface avec JavaScript pur pour simuler des interactions avec des données JSON.
- Appliquer un développement structuré avec un dépôt Git et des commits réguliers et clairs.

## Pages à développer

### 1. Page de Feed
Affiche les posts des utilisateurs, avec des fonctionnalités d'interaction. Le contenu est chargé à partir d'un fichier JSON simulant une API.

#### Fonctionnalités
- **Affichage des posts** : Les posts sont gérés dynamiquement en modifiant le DOM à partir d'un fichier JSON. Chaque post est au format JSON uniforme, avec texte et/ou photo.
- **Réactions** : Système de réactions (Like / Dislike / Love) avec des animations de particules personnalisées.
- **Commentaires** : Possibilité d'ajouter des commentaires sous chaque post et de commenter les commentaires existants.
- **Affichage plein écran** : Affiche la photo d'un post en plein écran, si une photo est présente.

### 2. Page de Messagerie
Affiche les conversations et permet d'interagir avec les messages, en utilisant un fichier JSON pour simuler un système de messagerie.

#### Fonctionnalités
- **Liste des conversations** : Charge et affiche dynamiquement la liste des conversations à partir d'un fichier JSON.
- **Aperçu du dernier message** : Pour chaque conversation, affiche le dernier message reçu.
- **Détail d'une conversation** : Accède à l'historique des messages pour chaque conversation.
- **Envoi de messages** : Permet d'ajouter un nouveau message au JSON et de le rendre visible instantanément.
- **Informations sur les messages** : Affiche le nom de l’utilisateur, la photo de profil, l’horodatage et le contenu de chaque message.

### 3. Page de Liste d'Amis
Permet d'afficher et d'organiser la liste des amis de l'utilisateur, avec des options de filtrage et de drag-and-drop.

#### Fonctionnalités
- **Affichage des amis** : Liste statique des amis sans interaction JSON.
- **Filtrage** : Filtrer les amis par nom et prénom pour un accès rapide.
- **Lien vers la messagerie** : Accès direct à la messagerie depuis chaque ligne d'ami.
- **Drag and Drop** : Permet de réorganiser la liste d'amis en déplaçant les éléments.

## Technologies Utilisées
- **Frontend** : HTML, CSS, JavaScript pur
- **Style** : Neumorphisme pour une expérience visuelle fluide et moderne
- **Données** : Fichiers JSON simulant les retours d'API pour le feed et la messagerie

## Installation
Pour cloner le projet et commencer à l'utiliser en local :
git clone https://github.com/cecileNis/socialMedia.git
cd socialMedia

