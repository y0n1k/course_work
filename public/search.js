import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
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
        alert("Please enter a movie title");
        return;
    }

    try {
        const response = await fetch(`/movies/title/${encodeURIComponent(title)}`);
        if (!response.ok) {
            throw new Error("Movie not found or error fetching movie data");
        }
        
        const movie = await response.json();
        displayMovieDetails(movie);
    } catch (error) {
        console.error(error);
        const movieDetails = document.getElementById('movieDetails');
        movieDetails.textContent = "Error fetching movie data. Please try again.";
    }
});

document.getElementById('searchButton').addEventListener('click', async () => {
  const title = document.getElementById('movieTitle').value.trim();
  if (!title) {
      alert("Please enter a movie title");
      return;
  }

  try {
      const response = await fetch(`/movies/title/${encodeURIComponent(title)}`);
      if (!response.ok) {
          throw new Error("Movie not found or error fetching movie data");
      }
      
      const movie = await response.json();
      displayMovieDetails(movie);
  } catch (error) {
      console.error(error);
      displayError("Error fetching movie data. Please try again.");
  }
});

function displayMovieDetails(movie) {
  // Clear previous movie details
  const movieDetailsContainer = document.getElementById('movieDetailsContainer');
  movieDetailsContainer.innerHTML = ""; // Clear previous results

  let movieDetails = document.createElement('div');
  movieDetails.classList.add('movieDetails');

  if (movie.Response === "False") {
      movieDetails.textContent = "Movie not found!";
      movieDetailsContainer.appendChild(movieDetails); // Append to the container
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

  // Append elements to the movieDetails container
  movieDetails.appendChild(titleElement);
  movieDetails.appendChild(genreElement);
  movieDetails.appendChild(plotElement);
  movieDetails.appendChild(directorElement);
  movieDetails.appendChild(posterElement);
  movieDetailsContainer.appendChild(movieDetails); // Append to the movieDetailsContainer
}
