import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set, get, child, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

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
      window.location.href = 'login.html';
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  });

  let savedDivs = document.getElementById('savedDivs');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      const moviesRef = ref(database, `users/${userId}/movies/`);
      get(moviesRef).then((snapshot) => {
        if (snapshot.exists()) {
          const movies = snapshot.val();
          for (const movieTitle in movies) {
            console.log(movieTitle, movies[movieTitle]);
          }
        } else {
          console.log("Не знайдено");
        }
      }).catch((error) => {
        console.error("Помилка отримання інформації:", error);
      });
    } else {
      console.log("Користувач не увійшов у систему");
    }
  });

  const savedDivsContainer = document.getElementById('savedDivs');

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;
    const moviesRef = ref(database, `users/${userId}/movies/`);

    get(moviesRef).then((snapshot) => {
      if (snapshot.exists()) {
        const movies = snapshot.val();
        let bigDiv = null;
        let movieCount = 0;
        for (const movieTitle in movies) {
          if (movieCount % 7 === 0) {
            bigDiv = document.createElement('div');
            bigDiv.classList.add('big-div');
            savedDivsContainer.appendChild(bigDiv);
          }
          const movieDiv = document.createElement('div');
          movieDiv.classList.add('movie-div');
          const titleElement = document.createElement('p');
          titleElement.textContent = movieTitle;

          const posterElement = document.createElement('img');
          posterElement.src = movies[movieTitle].poster;
          posterElement.alt = `${movieTitle} poster`;
          movieDiv.appendChild(posterElement);
          movieDiv.appendChild(titleElement);
          bigDiv.appendChild(movieDiv);

          movieCount++;
        }
      } else {
        console.log("Не знайдено");
      }
    }).catch((error) => {
      console.error("Помилка отримання інформації:", error);
    });
  } else {
    console.log("Користувач не увійшов у систему");
  }
});