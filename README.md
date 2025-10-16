 # Weather Dashboard

 Simple React/Vite app I built to check current weather, the next two weeks, and how the last year looked. It doubles as a playground for MUI styling and i18n.

 ## Features

 - Location search with current conditions and “feels like” reading.
 - Average monthly temperature chart (past 12 months).
 - Draggable 14-day forecast cards.
 - Light/dark modes and language toggle (English / Persian).
 - Responsive layout with a custom footer.

 ## Getting Started

 ```bash
 npm install
 npm run dev
 ```

 App runs on `http://localhost:5173`.  
 Production build: `npm run build` (preview with `npm run preview`).

 ## Stack

 - React + Vite + TypeScript
 - MUI for UI + theming
 - echarts-for-react for charts
 - i18next with browser language detector
 - Open-Meteo APIs (geocoding, forecast, archive)

 ## Notes

 - All API calls are client-side and don’t require keys.
 - Theme + language are stored in localStorage.
 - `npm run lint` is available if you want to tidy things up.
