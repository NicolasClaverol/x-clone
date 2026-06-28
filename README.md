# X Clone — Projet Passerelle 3

Projet realise dans le cadre de la certification developpeur web Believemy.

Un clone de X (anciennement Twitter) construit progressivement avec React,
demonstrant une approche de developpement incrementale via des commits Git reguliers.

## Technologies utilisees

- React avec Vite
- JavaScript ES6+
- Styles inline CSS-in-JS
- localStorage pour la persistance des donnees
- Git et GitHub pour le versioning

## Fonctionnalites

- Authentification : connexion avec 3 comptes fictifs
- Composer un tweet : limite de 280 caracteres
- Feed personnalise : tweets des comptes suivis uniquement
- Interactions : liker, repondre, supprimer un tweet
- Page profil : stats, tweets, abonnes et abonnements
- Abonnements : suivre/ne plus suivre, panneau Qui suivre
- Explorer : recherche de tweets et d'utilisateurs
- Notifications : likes et reponses recus

## Installation

git clone https://github.com/NicolasClaverol/x-clone.git
cd x-clone
npm install
npm run dev

Ouvre ensuite http://localhost:5173 dans ton navigateur.

## Comptes de demonstration

- Nicolas (@nicolas)
- Sara Dev (@saradev)
- Coding Wolf (@codingwolf)

## Structure du projet

src/
  components/
    Layout.jsx
    Sidebar.jsx
    TweetCard.jsx
    TweetComposer.jsx
    WhoToFollow.jsx
  context/
    AppContext.jsx
    AuthContext.jsx
  pages/
    LoginPage.jsx
    HomeFeed.jsx
    ProfilePage.jsx
    ExplorePage.jsx
    NotificationsPage.jsx
  App.jsx

Projet realise par Nicolas Claverol — Formation Believemy 2025
