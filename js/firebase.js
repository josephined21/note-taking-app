console.log(
  "js/firebase.js : Remember to replace the instructor's firebase keys with yours!"
);

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyDYQMmjIvs3TWvCLiQbNOgtTFopVbTQGOQ",
  authDomain: "cssi-day-12-908f1.firebaseapp.com",
  databaseURL: "https://cssi-day-12-908f1-default-rtdb.firebaseio.com",
  projectId: "cssi-day-12-908f1",
  storageBucket: "cssi-day-12-908f1.appspot.com",
  messagingSenderId: "241682562731",
  appId: "1:241682562731:web:030e7ffb3352b2d8dc81ee"
};
// END TODO

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
