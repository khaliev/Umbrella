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
  displayDate();

  if (navigator.geolocation) {
    // L'outil existe ! On demande les coordonnées
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Étape A : L'utilisateur a accepté de donner sa localisation!
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherByCoords(lat, lon);
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

// Fetch the forecast api

function getWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&APPID=${API_KEY}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const cityName = data.name;
      const temp = Math.round(data.main.temp);
      const cityElement = document.getElementById("city-name");
      cityElement.textContent = cityName;

      const tempElement = document.getElementById("temperature");
      tempElement.textContent = `${temp}°C`;
    })
    .catch((error) => {
      console.error("Problème avec fetch :", error.message);
    });
}

function displayDate() {
  const dateElement = document.getElementById("date");
  const now = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const formattedDate = now.toLocaleDateString("fr-FR", options);
  dateElement.textContent = formattedDate;
}
