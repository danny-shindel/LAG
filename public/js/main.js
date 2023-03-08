// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB-vd0vLh6oRUXR-t9aTxeopLpCwJu74ss",
//   authDomain: "lagoffice.firebaseapp.com",
//   projectId: "lagoffice",
//   storageBucket: "lagoffice.appspot.com",
//   messagingSenderId: "653395461026",
//   appId: "1:653395461026:web:548e56acd9bb9c4ea4e8fb",
//   measurementId: "G-NEJC9KF1TG",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

function myFunction() {
  var x = document.getElementById("myLinks");
  var y = document.getElementById("content");
  var z = document.getElementById("content_home");
  if (x.style.display === "block") {
    x.style.display = "none";
    if (y) {
      y.style.display = "block";
    }
    if (z) {
      z.style.display = "block";
    }
  } else {
    x.style.display = "block";
    if (y) {
      y.style.display = "none";
    }
    if (z) {
      z.style.display = "none";
    }
  }
}
