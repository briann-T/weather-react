import "./App.css";
import React, { useState } from "react";
import Clock from "./component/Clock";

const api = {
  key: "", //hidden API key
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`) //gets API call by cityname
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp >= 20
            ? "app-hot"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="date">
          <Clock />
        </div>
        <div className="search-box">
          <input
            type="text"
            id="input"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
            </div>
            <div className="weather-details">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
                <div className="details">
                  Feels like: {Math.round(weather.main.feels_like)}°C
                  <br />
                  Humidity: {weather.main.humidity}
                  <br />
                  Max Temp: {Math.round(weather.main.temp_max)}°C
                  <br />
                  Min Temp: {Math.round(weather.main.temp_min)}°C
                </div>
              </div>
              <div className="weather-box">
                <div className="weather-image">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="Icon of the current weather display"
                  />
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
