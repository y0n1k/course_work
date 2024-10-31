const express = require('express');
const bodyParser = require('body-parser');
const omdbDB = require('./omdbDB'); // Імпорт omdbService
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const host = '127.0.0.1'

app.use(bodyParser.json());

// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
   res.sendFile(`${__dirname}/index.html`)
   console.log('Successful');
   // res.send('Successful')
})
// let htmlsPath = path.join(__dirname, 'htmls')
// app.get('/', (req, res) => {
//     // res.send("Server is working!");
//     res.sendFile(`${__dirname}/index.html`)
//  });
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