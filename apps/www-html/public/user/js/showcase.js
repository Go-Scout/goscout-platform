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
