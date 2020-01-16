document.querySelectorAll(".attBtn").forEach(function(btn) {
  btn.onclick = (evt) => {
    const e = evt || window.event;
    const parent = e.target.parentNode || e.srcElement.parentNode;
    const target = e.target || e.srcElement;

    if (parent.querySelector(".active")) parent.querySelector(".active").classList.remove("active");

    target.classList.toggle("active");
  };
});

//Auth System
var firebaseConfig = {
  apiKey: "AIzaSyDOjiZ--U5gWKZTMyvd3juQle-4OQuHGpE",
  authDomain: "go-scout.firebaseapp.com",
  databaseURL: "https://go-scout.firebaseio.com",
  projectId: "go-scout",
  storageBucket: "go-scout.appspot.com",
  messagingSenderId: "376398836043",
  appId: "1:376398836043:web:abbd1bb48d5dc1b1b538ce",
  measurementId: "G-044W9K81T1"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
//firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  alert(`Welcome, ${user.email}`);
} else {
  alert("You need to login first!");
  window.location = "https://go-scout.web.app/index";
}
//})
//logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("User Logged Out");
  });
  location.assign("https://go-scout.web.app");
});
