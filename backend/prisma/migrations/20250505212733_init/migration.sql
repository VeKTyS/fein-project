-- CreateTable
CREATE TABLE "Jeu" (
    "ID_Jeu" TEXT NOT NULL PRIMARY KEY,
    "Nom_Jeu" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Annee_sortie" DATETIME NOT NULL,
    "Joueur_minimum" INTEGER NOT NULL,
    "Joueur_maximum" INTEGER NOT NULL,
    "Min_temps_de_jeu" DATETIME NOT NULL,
    "Max_temps_de_jeu" DATETIME NOT NULL,
    "Jeu_categorie" TEXT NOT NULL,
    "Jeu_editeur" TEXT NOT NULL,
    "Jeu_designer" TEXT NOT NULL,
    "Jeu_artiste" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "ID_Utilisateur" TEXT NOT NULL PRIMARY KEY,
    "Pseudo" TEXT NOT NULL,
    "Nom" TEXT NOT NULL,
    "Prenom" TEXT NOT NULL,
    "Mot_de_passe" TEXT NOT NULL,
    "Date_de_naissance" DATETIME NOT NULL,
    "Date_Inscription" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Categorie" (
    "ID_Categorie" TEXT NOT NULL PRIMARY KEY,
    "Nom_categorie" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Avis" (
    "IDAvis" TEXT NOT NULL PRIMARY KEY,
    "Note" REAL NOT NULL,
    "Nom" TEXT NOT NULL,
    "Date" TEXT NOT NULL,
    "URL" TEXT NOT NULL,
    "Users_Rated" TEXT NOT NULL,
    "Moyenne" REAL NOT NULL,
    "ID_Utilisateur" TEXT NOT NULL,
    "ID_Jeu" TEXT NOT NULL,
    CONSTRAINT "Avis_ID_Utilisateur_fkey" FOREIGN KEY ("ID_Utilisateur") REFERENCES "Utilisateur" ("ID_Utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Avis_ID_Jeu_fkey" FOREIGN KEY ("ID_Jeu") REFERENCES "Jeu" ("ID_Jeu") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Achat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ID_Jeu" TEXT NOT NULL,
    "ID_Utilisateur" TEXT NOT NULL,
    "date_achat" DATETIME NOT NULL,
    "qtt" INTEGER NOT NULL,
    "prix_unit" TEXT NOT NULL,
    CONSTRAINT "Achat_ID_Utilisateur_fkey" FOREIGN KEY ("ID_Utilisateur") REFERENCES "Utilisateur" ("ID_Utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Achat_ID_Jeu_fkey" FOREIGN KEY ("ID_Jeu") REFERENCES "Jeu" ("ID_Jeu") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Biblio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ID_Jeu" TEXT NOT NULL,
    "IDUtilisateur" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Biblio_IDUtilisateur_fkey" FOREIGN KEY ("IDUtilisateur") REFERENCES "Utilisateur" ("ID_Utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Biblio_ID_Jeu_fkey" FOREIGN KEY ("ID_Jeu") REFERENCES "Jeu" ("ID_Jeu") ON DELETE RESTRICT ON UPDATE CASCADE
);
