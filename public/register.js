import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBHC60Q0MVMl5hcjagFPfWOkYviGPG89HU",
    authDomain: "login-test-cf786.firebaseapp.com",
    databaseURL: "https://login-test-cf786-default-rtdb.firebaseio.com",
    projectId: "login-test-cf786",
    storageBucket: "login-test-cf786.firebasestorage.app",
    messagingSenderId: "698107167088",
    appId: "1:698107167088:web:90d55281d92465e76d8fb5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const signup = document.getElementById('signup');

  signup.addEventListener("click", function(event){
    event.preventDefault();
    const email = document.getElementById('email').value;
    // const name = document.getElementById('full_name').value;
    // const favourite_song = document.getElementById('favourite_song').value;
    // const milk_before_cereal = document.getElementById('milk_before_cereal').value;
    const password = document.getElementById('password').value
    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return;
  }
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert('Creating an account');
    window.location.href= 'public/search.html';
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Error: ${errorMessage}`);
    // ..
  });
  console.log('Hola!')
  })