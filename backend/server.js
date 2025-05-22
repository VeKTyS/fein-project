const express = require('express');
const bodyParser = require('body-parser');
const conn = require('./config/db'); // Renamed for clarity
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

      if (err.sqlState === '45000') {
        return res.status(400).json({ error: err.sqlMessage });
      }

      return res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
    }

    res.status(201).json({ message: 'Utilisateur inscrit avec succès.' });
  });
});


app.post('/api/login', async (req, res) => {
    const { pseudo, mot_de_passe } = req.body;

    try {
        if (!pseudo || !mot_de_passe) {
            return res.status(400).json({ message: error.sqlMessage });
        }

        const query = `
            SELECT * FROM utilisateur
            WHERE Pseudo = ? AND Mot_de_passe = ?
        `;

        const results = await new Promise((resolve, reject) => {
            conn.query(query, [pseudo, mot_de_passe], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        if (results.length > 0) {
            res.status(200).json({ message: 'Connexion réussie.', user: results[0] });
        } else {
            res.status(400).json({ message: error.sqlMessage });
        }
    } catch (error) {
        if (error.sqlState === '45000') {
            return res.status(400).json({ message: error.sqlMessage });
        }
        console.error('Database error:', error.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
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

app.get('/api/achat/:userId', async (req, res) => {
    const { userId } = req.params;

    console.log("Fetching games for userId:", userId);

    try {
        const rows = await new Promise((resolve, reject) => {
            conn.query(
                `SELECT achat.ID_Jeu, details.primary_key, achat.date_achat 
                FROM achat 
                JOIN details ON achat.ID_Jeu = details.ID
                WHERE achat.ID_Utilisateur = ?`,
                [userId],
                (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                }
            );
        });

        // Check if rows are empty
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'No games found for this user.' });
        }

        res.status(200).json({ success: true, games: rows });
    } catch (error) {
        console.error('Error fetching games from achat:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch games.' });
    }
});

app.post('/api/achat/:userId', async (req, res) => {
    const { userId } = req.params;
    const { gameId } = req.body;

    try {
        await new Promise((resolve, reject) => {
            conn.query(
                'INSERT INTO achat (ID_Utilisateur, ID_Jeu, date_achat) VALUES (?, ?, NOW())',
                [userId, gameId],
                (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                }
            );
        });

        res.status(201).json({ success: true, message: 'Jeu ajouté à la bibliothèque.' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout dans achat :', error);

        if (error.sqlState === '45000') {
            return res.status(400).json({ success: false, message: error.sqlMessage });
        }

        res.status(500).json({ success: false, message: 'Erreur serveur, veuillez réessayer.' });
    }
});

app.delete('/api/achat/:userId/:gameId', async (req, res) => {
    const { userId, gameId } = req.params;

    console.log(`Deleting game with ID ${gameId} for user ID ${userId}`);

    try {
        const result = await new Promise((resolve, reject) => {
            conn.query(
                'DELETE FROM achat WHERE ID_Utilisateur = ? AND ID_Jeu = ?',
                [userId, gameId],
                (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                }
            );
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Game not found for this user.' });
        }

        res.status(200).json({ success: true, message: 'Game removed successfully.' });
    } catch (error) {
        console.error('Error deleting game from achat:', error.message);
        res.status(500).json({ success: false, message: 'Failed to remove game.' });
    }
});


app.get('/api/views/Vue_Jeux_Par_Taille_Groupe', (req, res) => {
    const query = 'SELECT * FROM Vue_Jeux_Par_Taille_Groupe';
    conn.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from Vue_Jeux_Par_Taille_Groupe:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        console.log('Vue_Jeux_Par_Taille_Groupe Results:', results); // Debugging
        res.json(results);
    });
});

app.get('/api/views/Vue_Jeux_Par_Duree', (req, res) => {
    const query = 'SELECT * FROM Vue_Jeux_Par_Duree';
    conn.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from Vue_Jeux_Par_Duree:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        console.log('Vue_Jeux_Par_Duree Results:', results); // Debugging
        res.json(results);
    });
});

app.get('/api/views/Jeux_Rating_Superieur_9', (req, res) => {
    const query = 'SELECT * FROM Jeux_Rating_Superieur_9';
    conn.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from Jeux_Rating_Superieur_9:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(results);
    });
});

app.listen(5000, () => console.log('Backend running on port 5000'));