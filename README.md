# ☂️ Umbrella — Weather & Task Dashboard

A clean, responsive, glassmorphic daily dashboard web application that displays real-time weather forecasts, local time, contextual greetings, and a persistent task management list.

Built with pure **Vanilla JavaScript (ES6+)**, **Modern CSS**, and **Semantic HTML5** to showcase core web development fundamentals without reliance on external frameworks.

---

## ✨ Features

- 🌤️ **Real-Time Weather Data:** Fetches local weather conditions, temperature, daily min/max, and condition icons using the OpenWeather API.
- 📍 **Automatic Geolocation:** Prompts user location on startup to load local weather automatically, with fallback search support.
- 🔍 **City Search:** Allows manual city search for global weather tracking.
- ⏰ **Live Digital Clock & Date:** Displays local time with real-time updates and localized French date formatting.
- 👋 **Contextual Greeting:** Dynamic morning/evening greeting message based on current user time.
- 📋 **Persistent Todo List:** Full CRUD (Create, Read, Update, Delete) task manager synced with `localStorage`.
- 🎨 **Glassmorphism UI:** Modern semi-transparent aesthetic optimized for mobile and tablet touchscreens.

---

## 🛠️ Tech Stack & Standards

- **HTML5:** Semantic architecture, accessibility (`aria-label`), Open Graph metadata, and SEO/GEO optimizations.
- **CSS3:** Custom properties (`:root`), native CSS Nesting, relative units (`rem`), and iOS Safari input-zoom prevention.
- **JavaScript (ES6+):** Asynchronous API calls (`fetch`), DOM manipulation, event listeners, and data persistence via `localStorage`.
- **Typography:** Served via [Bunny Fonts](https://fonts.bunny.net/) (GDPR-compliant font hosting).

---

## 📂 Project Structure

```text
Umbrella/
├── images/
│   └── favicon.png
├── index.html        # Main sementic structure & OpenGraph tags
├── styles.css        # Responsive glassmorphism & component styles
├── app.js            # Main application logic & state management
├── config.js         # API Key configuration (Git-ignored)
└── README.md         # Project documentation
```

🚀 Getting Started Locally
Clone the repository:

Bash :

git clone [https://github.com/your-username/umbrella.git](https://github.com/your-username/umbrella.git)
cd umbrella

Set up your API Key:
Get a free API key from OpenWeatherMap.
Create a config.js file at the root of the project:

JavaScript code :

const API_KEY = "YOUR_OPENWEATHER_API_KEY";
Run the app:
Open index.html in your browser (or use a local server extension like VS Code Live Server).

📱 Mobile & Responsive Considerations
Designed with a mobile-first approach suitable for smartphones and tablets:

Touch-friendly tap targets.

iOS Safari input-zoom prevention applied (1rem / 16px base font size on fields).

Scalable layout bounded at a maximum width of 420px for optimal viewing on larger screens.

📄 License
This project is open-source and available under the MIT License.
