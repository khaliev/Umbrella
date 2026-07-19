document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
function initApp() {
  console.log("L'application Umbrella est prête!");
  if (navigator.geolocation) {
    // L'outil existe ! On demande les coordonnées
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Étape A : L'utilisateur a accepté !
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(`Position trouvée : Lat ${lat}, Lon ${lon}`);
      },
      (error) => {
        // Étape B : L'utilisateur a refusé ou il y a eu un bug
        console.log("Impossible de récupérer la position :", error.message);
      },
    );
  } else {
    // L'outil n'existe pas sur ce vieux navigateur
    console.log("La géolocalisation n'est pas supportée par ce navigateur.");
  }
}
