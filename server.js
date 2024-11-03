const express = require('express');
const bodyParser = require('body-parser');
const omdbDB = require('./omdbDB'); // Імпорт omdbService
const path = require('path');
const superagent = require('superagent'); // for Node.js

const app = express();
const PORT = process.env.PORT || 8080;
const host = '127.0.0.1'

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
   res.redirect('/index.html');
   console.log('Redirected to index.html');
});

app.get('/login.html', (req, res) => {
   res.sendFile(`${__dirname}/login.html`)
   console.log('Successful');
})

app.get('/index.html', (req, res) => {
   res.sendFile(`${__dirname}/index.html`)
   console.log('Successful');
})

// Маршрут для отримання фільму за назвою
app.get('/movies/title/:title', async (req, res) => {
   const { title } = req.params;
   try {
      const movie = await omdbDB.getMovieByTitle(title);
      res.json(movie);
   } catch (error) {
      res.status(500).send("Error fetching movie data");
   }
});

// Маршрут для отримання фільму за ID
app.get('/movies/id/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const movie = await omdbDB.getMovieById(id);
      res.json(movie);
   } catch (error) {
      res.status(500).send("Error fetching movie data");
   }
});

// Запуск сервера
app.listen(PORT, host, () => {
   console.log(`Server is running at http://${host}:${PORT}/`);
});