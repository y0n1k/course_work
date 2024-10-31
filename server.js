const express = require('express');
const bodyParser = require('body-parser');
const omdbDB = require('./omdbDB'); // Імпорт omdbService
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const host = '127.0.0.1'

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
// let htmlsPath = path.join(__dirname, 'htmls')
app.get('/', (req, res) => {
    // res.send("Server is working!");
    res.sendFile(`${__dirname}/index.html`)
 });
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


//lab4

// const express = require('express');
// const { Command } = require('commander');
// // const omdbDB = require('./omdbDB');
// const path = require('path');

// const app = express();
// const program = new Command();

// // Налаштування командного рядка
// program
//    .requiredOption('-h, --host <host>', 'Server host')
//    .requiredOption('-p, --port <port>', 'Server port');
// program.parse(process.argv);

// const { host, port } = program.opts();
// console.log(`Host: ${host}`);
// console.log(`Port: ${port}`);

// // Маршрут для отримання фільму за назвою
// app.get('/movies/title/:title', async (req, res) => {
//    const { title } = req.params;
//    try {
//       const movie = await omdbDB.getMovieByTitle(title);
//       res.json(movie);
//    } catch (error) {
//       res.status(500).send("Error fetching movie data");
//    }
// });

// // Маршрут для отримання фільму за ID
// app.get('/movies/id/:id', async (req, res) => {
//    const { id } = req.params;
//    try {
//       const movie = await omdbDB.getMovieById(id);
//       res.json(movie);
//    } catch (error) {
//       res.status(500).send("Error fetching movie data");
//    }
// });

// console.log(__dirname)

// // app.get('/', async (req, res) => {
// //     res.sendFile('index.html')
// // })


// // Запуск сервера
// app.listen(port, host, () => {
//    console.log(`Server is running at http://${host}:${port}/`);
// });
