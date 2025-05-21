const express = require('express');
const bodyParser = require('body-parser');
const conn = require('./config/db'); // Renamed for clarity
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const detailsSample = require('./data/details_sample.json');

const { getAllDetails } = require('./config/detailsService');
const { getAllratings } = require('./config/detailsService');
const { addData } = require('./config/detailsService');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/api/details_sample', (req, res) => {
  res.json(detailsSample);
});

app.get('/api/details', (req, res) => {
  getAllDetails((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.get('/api/ratings', (req, res) => {
  getAllratings((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post('/api/utilisateur', (req, res) => {
  const { pseudo, nom, prenom, mot_de_passe, date_de_naissance } = req.body;

  const query = `
    INSERT INTO utilisateur (Pseudo, Nom, Prénom, Mot_de_passe, Date_de_naissance, Date_Inscription)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;

  conn.query(query, [pseudo, nom, prenom, mot_de_passe, date_de_naissance], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
    }
    res.status(201).json({ message: 'Utilisateur inscrit avec succès.' });
  });
});

app.post('/api/login', (req, res) => {
  const { pseudo, mot_de_passe } = req.body;

  const query = `
    SELECT * FROM utilisateur
    WHERE Pseudo = ? AND Mot_de_passe = ?
  `;

  conn.query(query, [pseudo, mot_de_passe], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Connexion réussie.', user: results[0] });
    } else {
      res.status(401).json({ error: 'Pseudo ou mot de passe incorrect.' });
    }
  });
});

app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;

  const query = `
    SELECT Pseudo FROM utilisateur WHERE ID_Utilisateur = ?
  `;

  conn.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }

    if (results.length > 0) {
      res.status(200).json({ pseudo: results[0].Pseudo });
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
  });
});

app.put('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  const { pseudo, mot_de_passe } = req.body;

  const query = `
    UPDATE utilisateur
    SET Pseudo = ?, Mot_de_passe = ?
    WHERE ID_Utilisateur = ?
  `;

  conn.query(query, [pseudo, mot_de_passe, userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }

    res.status(200).json({ message: 'Informations mises à jour avec succès.' });
  });
});

app.listen(5000, () => console.log('Backend running on port 5000'));