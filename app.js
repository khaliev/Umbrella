/* ==========================================================================
   1. GLOBAL STATE & LOCAL STORAGE INITIALIZATION
   ========================================================================== */
// Retrieve stored tasks from localStorage or initialize an empty array
const storedTodos = localStorage.getItem("todos");
let todos = storedTodos ? JSON.parse(storedTodos) : [];

/* ==========================================================================
   2. APPLICATION INITIALIZATION
   ========================================================================== */
// Launch application services once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  console.log("Umbrella App is ready!");

  updateGreeting();
  startClock();
  displayDate();
  initGeolocation();
  renderTodos();
}

/* ==========================================================================
   3. TIME & GREETING SERVICES
   ========================================================================== */
// Display contextual greeting message based on local time
function updateGreeting() {
  const greetingElement = document.getElementById("greeting");
  const currentHour = new Date().getHours();

  if (currentHour < 18) {
    greetingElement.textContent = "Bonjour! ☀️";
  } else {
    greetingElement.textContent = "Bonsoir! 🌙";
  }
}

// Format and display current date in French
function displayDate() {
  const dateElement = document.getElementById("date");
  const now = new Date();
  const options = { weekday: "long", day: "numeric", month: "long" };

  dateElement.textContent = now.toLocaleDateString("fr-FR", options);
}

// Real-time digital clock with leading zeros padding
function startClock() {
  const clockElement = document.getElementById("clock");

  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    clockElement.textContent = `${hours}:${minutes}`;
  }

  updateTime(); // Immediate execution to avoid blank UI delay
  setInterval(updateTime, 1000);
}

/* ==========================================================================
   4. WEATHER API SERVICE
   ========================================================================== */
// Request user browser location on startup
function initGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.warn("Geolocation permission denied or failed:", error.message);
      },
    );
  } else {
    console.warn("Geolocation is not supported by this browser.");
  }
}

// Fetch weather data using coordinates
function getWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&APPID=${API_KEY}`;

  fetch(url)
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP Error Status: ${response.status}`);
      return response.json();
    })
    .then((data) => updateWeatherDOM(data))
    .catch((error) => console.error("Weather fetch failed:", error.message));
}

// Fetch weather data using city name search
function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&APPID=${API_KEY}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then((data) => updateWeatherDOM(data))
    .catch((error) => {
      console.error("City search error:", error.message);
      alert("Impossible de trouver cette ville. Vérifiez l'orthographe !");
    });
}

// Centralized function to render API weather data into DOM
function updateWeatherDOM(data) {
  document.getElementById("city-name").textContent = data.name;
  document.getElementById("temperature").textContent =
    `${Math.round(data.main.temp)}°C`;
  document.getElementById("temp-min").textContent =
    `${Math.round(data.main.temp_min)}°C`;
  document.getElementById("temp-max").textContent =
    `${Math.round(data.main.temp_max)}°C`;

  const description = data.weather[0].description;
  document.getElementById("weather-description").textContent = description;

  const iconElement = document.getElementById("weather-icon");
  iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  iconElement.alt = description;
}

// Weather Search Form Listener
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

/* ==========================================================================
   5. TODO LIST SERVICE & LOCAL STORAGE
   ========================================================================== */
const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task");
const todoList = document.getElementById("todo-list");

// Persist task array state to browser storage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add new task handler
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();

  if (text === "") return;

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(newTodo);
  taskInput.value = "";
  renderTodos();
});

// Render task list in DOM and synchronize storage
function renderTodos() {
  saveTodos();
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    if (todo.completed) {
      li.classList.add("line-through");
    }

    // Delete task button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");

    // Toggle complete status event
    li.addEventListener("click", () => {
      todo.completed = !todo.completed;
      renderTodos();
    });

    // Delete task event
    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevents li click event firing
      todos = todos.filter((item) => item.id !== todo.id);
      renderTodos();
    });

    li.append(deleteBtn);
    todoList.append(li);
  });
}
