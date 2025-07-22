const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

app.use(cors());

app.get('/api/tmdb/*', async (req, res) => {
  try {
    const endpoint = req.params[0];
    const search = new URLSearchParams(req.query);
    // Ajoute la clé API à la requête
    search.set('api_key', API_KEY);
    const url = `${BASE_URL}/${endpoint}?${search.toString()}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erreur proxy TMDB', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy TMDB en écoute sur http://localhost:${PORT}`);
});
