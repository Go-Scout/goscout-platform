const showButton = () => {
    const show = document.querySelector('#loginSubmit')
    show.style = "display: block;"
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err)
      })
    })
}
let deferredPrompt

window.addEventListener('beforeinstallprompt', (e) => {
  deferredPrompt = e   // Stash the event so it can be triggered later.
  showInstallPromotion()
})
window.addEventListener('appinstalled', (evt) => {
  console.log('a2hs installed')
})
