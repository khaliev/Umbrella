document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
function initApp() {
  console.log("L'application Umbrella est prête!");
  // Message d'accueil
  const greetingElement = document.getElementById("greeting");
  const currentHour = new Date().getHours();
  if (currentHour < 18) {
    greetingElement.textContent = "Bonjour! ☀️";
  } else {
    greetingElement.textContent = "Bonsoir! 🌙";
  }

  // lancement de l'horloge en temps réel

  startClock();

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

function startClock() {
  const clockElement = document.getElementById("clock");

  function updateTime() {
    const now = new Date();
    // padStart(2, '0') permet d'écrire "05" au lieu de "5" pour les minutes/secondes
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    clockElement.textContent = `${hours}:${minutes}`;
  }
  // On l'appelle une première fois tout de suite pour éviter un blanc d'une seconde
  updateTime();
  // On la met à jour toutes les minutes (60000 millisecondes)
  setInterval(updateTime, 60000);
}

const API_KEY = "";
