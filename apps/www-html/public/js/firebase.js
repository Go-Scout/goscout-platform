const firebaseConfig = {
  apiKey: "AIzaSyDOjiZ--U5gWKZTMyvd3juQle-4OQuHGpE",
  authDomain: "go-scout.firebaseapp.com",
  databaseURL: "https://go-scout.firebaseio.com",
  projectId: "go-scout",
  storageBucket: "go-scout.appspot.com",
  messagingSenderId: "376398836043",
  appId: "1:376398836043:web:abbd1bb48d5dc1b1b538ce",
  measurementId: "G-044W9K81T1"
}
firebase.initializeApp(firebaseConfig)
//user creation
const auth = firebase.auth()
const signUpFrom = document.querySelector('#signup-form')
signUpFrom.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = signUpFrom['signup-email'].value //reteves users information required at probaseballreport domain
  const password = signUpFrom['signup-password'].value
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log('User Created')
    auth.signInWithEmailAndPassword(email, password).then(cred => {
      console.log('User Logged In')
      document.querySelector('#showcase').style.display = 'flex'
      document.querySelector('#logout').style.display = 'flex'
      document.querySelector('#login').style.display = 'none'
      document.querySelector('#signup').style.display = 'none'
      $('#sum').modal('hide')
    })
  }).catch(err => {
    let errorMessage = document.querySelector('#sumError')
    errorMessage.innerHTML = err.message
  })
})

//logout 
const logout = document.querySelector('#logout')
logout.addEventListener('click', (e) => {
  e.preventDefault()
  auth.signOut().then(() => {
    console.log("User Logged Out")
})
  document.querySelector('#showcase').style.display = 'none'
  document.querySelector('#login').style.display = 'flex'
  document.querySelector('#logout').style.display = 'none'
  document.querySelector('#signup').style.display = 'none'
})
//login 
const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginForm['login-email'].value
  const password = loginForm['login-password'].value
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    console.log('User Logged In')
    document.querySelector('#showcase').style.display = 'flex'
    document.querySelector('#logout').style.display = 'flex'
    document.querySelector('#login').style.display = 'none'
    document.querySelector('#signup').style.display = 'none'
    $('#lgm').modal('hide')
  }).catch(err => {
    let errorMessage = document.querySelector('#lgmError')
    errorMessage.innerHTML = err.message
  })
})
//form
const form = document.querySelector("#contact")
const inputEmail = form.querySelector("#emailInput")
const inputName = form.querySelector("#nameInput")
const inputMessage = form.querySelector('#messageInput')
const submitBtn = form.querySelector('#sendBtn')
const sent = form.querySelector('#sent')
const firebasePush = (input) => {
  //prevents from braking
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  //push itself
  var mailsRef = firebase
    .database()
    .ref("emails")
    .push()
    .set({
      mail: inputEmail.value,
      name: inputName.value,
      message: inputMessage.value
    })
}
//What to do if it is sent
const allIsWell = () => {
  submitBtn.setAttribute('disabled', '')
  sent.innerHTML = "Your message has been sent!"
}
//push on form submit
if (form) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault()
    firebasePush(inputEmail, inputName, inputMessage)

    //shows alert if everything went well.
    return allIsWell()
  
  })
}
