import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBHC60Q0MVMl5hcjagFPfWOkYviGPG89HU",
    authDomain: "login-test-cf786.firebaseapp.com",
    databaseURL: "https://login-test-cf786-default-rtdb.firebaseio.com",
    projectId: "login-test-cf786",
    storageBucket: "login-test-cf786.firebasestorage.app",
    messagingSenderId: "698107167088",
    appId: "1:698107167088:web:90d55281d92465e76d8fb5"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.getElementById('logout').addEventListener('click', () => {
    signOut(auth).then(() => {
      // Sign-out successful, redirect to login page
      window.location.href = 'login.html';
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  });

  document.getElementById('searchButton').addEventListener('click', async () => {
    const title = document.getElementById('movieTitle').value.trim();
    if (!title) {
        alert("Введіть назву фільму");
        return;
    }

    try {
        const response = await fetch(`/movies/title/${encodeURIComponent(title)}`);
        if (!response.ok) {
            throw new Error("Не вийшло отримати дані про фільм");
        }
        
        const movie = await response.json();
        displayMovieDetails(movie);
    } catch (error) {
        console.error(error);
        const movieDetails = document.getElementById('movieDetails');
        movieDetails.textContent = "Не вийшло отримати дані про фільм";
    }
});

function displayMovieDetails(movie) {
  return new Promise((resolve, reject) => {
    const movieDetailsContainer = document.getElementById('movieDetailsContainer');
    movieDetailsContainer.innerHTML = ""; // Clear previous results

    let movieDetails = document.createElement('div');
    movieDetails.classList.add('movieDetails');

    if (movie.Response === "False") {
      movieDetails.textContent = "Фільм не знайдено :(";
      movieDetailsContainer.appendChild(movieDetails); // Append to the container
      resolve(); // Resolve immediately if movie is not found
      return;
    }

    // Create elements for movie details
    const titleElement = document.createElement('h2');
    titleElement.textContent = `${movie.Title} (${movie.Year})`;

    const genreElement = document.createElement('p');
    genreElement.textContent = `Genre: ${movie.Genre}`;

    const plotElement = document.createElement('p');
    plotElement.textContent = `Plot: ${movie.Plot}`;

    const directorElement = document.createElement('p');
    directorElement.textContent = `Director: ${movie.Director}`;

    const posterElement = document.createElement('img');
    posterElement.src = movie.Poster;
    posterElement.alt = `Poster of ${movie.Title}`;

    const saveButton = document.createElement('button');
    saveButton.classList.add('greenbutton');
    saveButton.innerText = 'Зберегти';

    // Attach event listener to saveButton to call save with the movie data
    saveButton.addEventListener('click', async () => {
      await save(movie); // Pass the movie data to save
    });

    // Append elements to the movieDetails container
    movieDetails.appendChild(posterElement);
    movieDetails.appendChild(titleElement);
    movieDetails.appendChild(genreElement);
    movieDetails.appendChild(plotElement);
    movieDetails.appendChild(directorElement);
    movieDetails.appendChild(saveButton);
    movieDetailsContainer.appendChild(movieDetails); // Append to the movieDetailsContainer

    resolve(); // Resolve when details have been added to the DOM
  });
}

async function save(movie) {
  const user = auth.currentUser; // Assuming user is logged in
  if (user) {
  const userId = user.uid;
  const movieRef = ref(database, `users/${userId}/movies/${movie.Title}`);
  try {
    // Check if the movie already exists
    const snapshot = await get(movieRef);

    if (snapshot.exists()) {
      alert("Ви вже зберегли цей фільм");
    } else {
      // Movie does not exist, so save it
      await set(movieRef, {
        title: movie.Title,
        year: movie.Year,
        genre: movie.Genre,
        plot: movie.Plot,
        director: movie.Director,
        poster: movie.Poster
      });

      alert('Фільм збережено до Вашого списку!');
      console.log('Movie saved successfully');
    }
  } catch (error) {
    console.error("Error checking or saving movie data:", error);
    alert('Не вийшло');
  }
}
  else {
    alert("Ви не ввійшли в акаунт");
  }
}