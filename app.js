// GREETING SECTION

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
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clockElement.textContent = `${hours}:${minutes}`;
  }
  // On l'appelle une première fois tout de suite pour éviter un blanc d'une seconde
  updateTime();
  // On la met à jour toutes les secondes (60 millisecondes)
  setInterval(updateTime, 1000);
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
      updateWeatherDOM(data);
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconElement = document.getElementById("weather-icon");
      const descElement = document.getElementById("weather-description");
      descElement.textContent = description;
      const cityName = data.name;
      const temp = Math.round(data.main.temp);
      const tempMin = Math.round(data.main.temp_min);
      const tempMax = Math.round(data.main.temp_max);

      document.getElementById("temp-min").textContent = `${tempMin}°C`;
      document.getElementById("temp-max").textContent = `${tempMax}°C`;
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

function updateWeatherDOM(data) {
  const cityName = data.name;
  const temp = Math.round(data.main.temp);
  const tempMin = Math.round(data.main.temp_min);
  const tempMax = Math.round(data.main.temp_max);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;

  document.getElementById("city-name").textContent = cityName;
  document.getElementById("temperature").textContent = `${temp}°C`;
  document.getElementById("temp-min").textContent = `${tempMin}°C`;
  document.getElementById("temp-max").textContent = `${tempMax}°C`;
  document.getElementById("weather-description").textContent = description;

  const iconElement = document.getElementById("weather-icon");
  iconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  iconElement.alt = description;
}

function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&APPID=${API_KEY}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ville non trouvée");
      }
      return response.json();
    })
    .then((data) => {
      updateWeatherDOM(data);
    })
    .catch((error) => {
      console.error("Erreur de la recherche :", error.message);
      alert("impossible de trouver cette ville. Vérifiez l'orthographe !");
    });
}

const weatherForm = document.getElementById("weather-form");
const weatherInput = document.getElementById("weather-input");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = weatherInput.value.trim();
  if (city !== "") {
    getWeatherByCity(city);
    weatherInput.value = "";
  }
});

initApp();

// TO DO SECTION

let todos = [];

const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task");

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (taskInput.value.trim() === "") return;
  const newTodo = {
    id: Date.now(),
    text: taskInput.value,
    completed: false,
  };

  todos.push(newTodo);

  taskInput.value = "";

  renderTodos();
});

const todoList = document.getElementById("todo-list");

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach(function (todo) {
    const li = document.createElement("li");
    li.textContent = todo.text;
    todoList.append(li);
    if (todo.completed === true) {
      li.classList.add("line-through");
    } else {
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    li.append(deleteBtn);
    li.addEventListener("click", function () {
      todo.completed = !todo.completed;
      renderTodos();
    });

    deleteBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      todos = todos.filter(function (item) {
        return item.id !== todo.id;
      });
      renderTodos();
    });
  });
}
