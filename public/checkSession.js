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
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log("User is logged in:", user.email);
    let userEmail = document.getElementById('user-email');
    userEmail.innerText = user.email;
    // Here you can load the user's favorite movies or any other personalized data
  } else {
    // No user is signed in, redirect to login page
    window.location.href = 'login.html';
  }
});