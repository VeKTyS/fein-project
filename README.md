Pour lancer le projet : 

- Dans un terminal : cd frontend - npm install - npm run dev
- Dans un autre terminal : cd backend - npm install - npm install dotenv (nécessaire des fois je ne sais pas pourquoi) - node server.js

Pour lier la base de donnée (côté enseignant) :

- Voir sur Moodle le dump du schema de la base de donnée (vues, triggers, et données incluses)
- Créer un fichier ENV ou modifier dans le fichier backend/config/db.js les identifiants de connexion

--------------------------

# 📚 Application de Librairie de Jeux de Société

Projet réalisé dans le cadre du cours **TI603 – Bases de Données Avancées** à l’EFREI Paris.

## 👥 Équipe

- VONG Lucas  
- WANG Léo  
- REN Jonathan  

## 🎯 Objectif

Développer une **application web** avec une **base de données relationnelle** permettant de gérer une **librairie de jeux de société**. L'utilisateur peut consulter, acheter, emprunter, et noter des jeux.

## 🧩 Fonctionnalités

- 🔍 Recherche de jeux
- 🛒 Ajout au panier et achat de jeux
- 📝 Rédaction de critiques et avis
- 📚 Gestion de bibliothèque personnelle
- 🔐 Authentification (utilisateur invité/enregistré)

## 🗂 Structure de la Base de Données

### Entités principales

- `Utilisateur` (ID, nom, prénom, pseudo, mot de passe, etc.)
- `Jeu` (ID, nom, description, année, catégories, éditeur, etc.)
- `Achat` (ID, utilisateur, jeu, montant, mode de paiement, date)
- `Bibliothèque` (relation utilisateur-jeu, date d’achat)

### Conception

- MCD / MLD disponibles dans la documentation
- Base de données normalisée et optimisée
- Index, vues, triggers, procédures stockées implémentés

## 🖼 Maquettes

Maquettes réalisées sur **Figma** :

- Page d’accueil
- Page de profil utilisateur
- Détail d’un jeu

## ⚙️ Technologies utilisées

- **MySQL** : gestion de base de données
- **Looping** : conception MCD
- **Figma** : prototypage UI
- **ReactJS, ViteJS, Express** : programmation du site

## 🚧 Défis rencontrés

- 📉 Problème de lenteur dû aux appels API → solution temporaire avec mise en cache
- 📷 Faible qualité des images fournies → impact négatif sur l'UX


##© EFREI Paris - 2025 VONG Lucas WANG Leo REN Jonathan. Tous droits réservés.
