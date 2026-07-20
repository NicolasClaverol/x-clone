# X Clone - Projet Passerelle 3

Projet realise dans le cadre de la certification developpeur web Believemy.

Un clone de X (anciennement Twitter) construit progressivement avec React et Vite, avec des commits reguliers sur GitHub qui illustrent le developpement etape par etape.

## Technologies utilisees

- React avec Vite
- JavaScript ES6+
- CSS inline (styles en JS)
- localStorage pour la persistance des donnees
- Git et GitHub pour le versioning

## Fonctionnalites

- Connexion et deconnexion avec 3 comptes fictifs
- Composer un tweet avec limite de 280 caracteres
- Feed personnalise : tweets des comptes suivis uniquement
- Liker un tweet
- Repondre a un tweet
- Supprimer un tweet
- Page profil avec stats (tweets, abonnes, abonnements)
- Abonnements : suivre et ne plus suivre un compte
- Panneau Qui suivre
- Page Explorer avec recherche en temps reel
- Page Notifications : likes et reponses recus

## Installation

\```
git clone https://github.com/NicolasClaverol/x-clone.git
cd x-clone
npm install
npm run dev
\```

Ouvre ensuite http://localhost:5173 dans ton navigateur.

## Comptes de demonstration

- Nicolas (@nicolas)
- Ulysse (@ulysse)
- Agamemnon (@agamemnon)

## Structure du projet

\```
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
\```

## Criteres du cahier des charges

- Connexion et deconnexion : OK
- Creation d un tweet : OK
- Affichage des tweets sur un profil : OK
- Feed principal : OK
- Repondre a un tweet : OK
- Supprimer un tweet : OK
- Git et GitHub : OK
- Documentation technique : OK
- Video de demonstration : OK

Projet realise par Nicolas Claverol - Formation Believemy 2026