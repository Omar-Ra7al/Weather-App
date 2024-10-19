// Css >>
import "./Weather.css";
// React >>
import { useState, useEffect, useMemo } from "react";
// Images >>
import Loader from "../Loader/Loader";
import Clear from "../assets/Images/Clear.jpg";
import Cloudy from "../assets/Images/Cloudy.webp";
import Raining from "../assets/Images/Raining.jpg";
import Thunderstorm from "../assets//Images/thunderstorm.jpeg";
import Snow from "../assets//Images/Snow.jpg";
import Mist from "../assets//Images/Mist.jpg";
import Haze from "../assets//Images/Hazz.jpg";
import Dust from "../assets//Images/Dust.jpg";
import Sand from "../assets//Images/Sand.jpg";
import Tornado from "../assets//Images/Tornado.jpg";

export default function Weather() {
  const [weather, setWeather] = useState([]);
  const [weatherToday, setWeatherToday] = useState([]);
  const [loading, setloading] = useState(false);
  const [city, setCity] = useState("usa");
  const [bgImage, setBgImage] = useState("");
  const [inputValue, setinputValue] = useState("");

  // Featch Data
  useEffect(() => {
    const apiKey = "daf24f4a6e4dd9279c18d3b08dab1672";
    setloading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather([]);
        const currentTime = data.list[0].dt_txt.split(" ")[1];
        const weatherData = data.list.filter((forecast) =>
          forecast.dt_txt.includes(currentTime)
        );
        setWeather(weatherData);

        // Today Weather >>
        const currentDay = data.list[0].dt_txt.split(" ")[0];
        const currentDayData = data.list.filter((forecast) =>
          forecast.dt_txt.includes(currentDay)
        );
        setWeatherToday(currentDayData);
      })
      // After the data comes
      .then(() => {
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        console.error("Error fetching data:", error.mssage);
        alert("Wrong City Name");
      });
  }, [city]);

  // << Start Weather Jsx
  const weatherJsx = useMemo(() => {
    if (!weather || weather.length === 0) return null;
    console.log("Weather JSX is re-rendering", weather);
    return weather.map((forecast) => {
      const tempCelsius = 273.15;
      // Temp Status >>
      const temp = (forecast.main.temp - tempCelsius).toFixed(0);
      const tempMax = (forecast.main.temp_max - tempCelsius).toFixed(0);
      const tempMin = (forecast.main.temp_min - tempCelsius).toFixed(0);
      const date = forecast.dt_txt.split(" ")[0];
      const dayName = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
      });

      // Weather Status >>
      const weatherStatus = forecast.weather[0];
      const icon = weatherStatus.icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      return (
        <div key={icon} className="day">
          <p>{dayName}</p>
          <div className="img-wrapper">
            <img src={iconUrl} alt={icon} />
          </div>
          <p>
            {tempMin}
            <span>C°</span>
          </p>
          <div className="line">
            <span style={{ width: `${temp}%` }}></span>
          </div>
          <p>
            {tempMax}
            <span>C°</span>
          </p>
        </div>
      );
    });
  }, [weather]);
  // End Weather Jsx //>>

  // Start Today Full Weather
  const todayFullDayWeatherJsx = useMemo(() => {
    if (!weatherToday || weatherToday.length === 0) return null;
    return weatherToday
      .map((forecast) => {
        const tempCelsius = 273.15;
        // Temp Status >>
        const temp = (forecast.main.temp - tempCelsius).toFixed(0);
        const date = forecast.dt_txt.split(" ")[1].slice(0, 2);
        // Weather Status >>
        const weatherStatus = forecast.weather[0];
        const icon = weatherStatus.icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        return (
          <div key={icon} className="day">
            <p>{date}</p>
            <div className="img-wrapper">
              <img src={iconUrl} alt={temp} />
            </div>
            <p className="temp">
              {temp}
              <span>°C</span>
            </p>
          </div>
        );
      })
      .slice(0, 5);
  }, [weatherToday]);
  // End Today Full Weather //>>

  // << Start Today Now Weather Jsx
  const todayNowWeatherJsx = useMemo(() => {
    if (!weather || weather.length === 0) return null;
    const today = weather[0];
    const tempCelsius = 273.15;
    const temp = (today.main.temp - tempCelsius).toFixed(0);
    const tempMax = (today.main.temp_max - tempCelsius).toFixed(0);
    const tempMin = (today.main.temp_min - tempCelsius).toFixed(0);
    const date = today.dt_txt.split(" ")[0];
    const icon = today.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // Set BG  >>>
    const description = today.weather[0].main;
    switch (description) {
      case "Clouds":
        setBgImage(Cloudy);
        break;
      case "Rain":
        setBgImage(Raining);
        break;
      case "Clear":
        // setBgImage(Sand);
        setBgImage(Clear);
        break;
      case "Thunderstorm":
        setBgImage(Thunderstorm);
        break;
      case "Drizzle":
        setBgImage(Raining);
        break;
      case "Snow":
        setBgImage(Snow);
        break;
      case "Mist":
        setBgImage(Mist);
        break;
      case "Smoke":
        setBgImage(Dust);
        break;
      case "Haze":
        setBgImage(Haze);
        break;
      case "Dust":
        setBgImage(Dust);
        break;
      case "Fog":
        setBgImage(Mist);
        break;
      case "Sand":
        setBgImage(Sand);
        break;
      case "Ash":
        setBgImage(Raining);
        break;
      case "Squall":
        setBgImage(Thunderstorm);
        break;
      case "Tornado":
        setBgImage(Tornado);
        break;
      default:
        break;
    }
    return (
      <>
        <div className="main-temp">
          <p className="current-temp">
            {" "}
            {temp}
            <span>°C</span>
          </p>
          <img src={iconUrl} alt={icon} />
        </div>
        <div className="details">
          <p className="city">{city}</p>
          <p>
            <span>{date} | </span>
            <span>H{tempMax}°</span>
            <span>L{tempMin}°</span>
          </p>
        </div>
      </>
    );
  }, [weather]);
  // End Today Now Weather Jsx //>>

  return (
    <div
      className="weather"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}>
      {loading ? (
        <Loader />
      ) : (
        <div className="content">
          <nav>
            <div className="container">
              <div className="logo">
                <p>Weather.com</p>
              </div>
            </div>
          </nav>
          <div className="container">
            <div className="weather-container">
              {/* left */}
              <div className="weather-today">
                <div className="search">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                      setinputValue(e.target.value);
                    }}
                    placeholder="City Name"
                  />
                  <button
                    onClick={() => {
                      setCity(inputValue);
                    }}>
                    Search
                  </button>
                </div>
                {todayNowWeatherJsx}
              </div>
              {/* right */}
              <div className="weather-details">
                {/* Today Temp >> */}
                <div className="today-temp">
                  <div className="card">
                    <div className="card-title">
                      {weather.length != 0 ? (
                        weather[0].weather[0].description
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="card-body">{todayFullDayWeatherJsx}</div>
                  </div>
                </div>
                {/* 5 Forecast */}
                <div className="next-five-forecast">
                  <div className="card">
                    <div className="card-title">5 - Day Forecast</div>
                    <div className="card-body forecast-body">{weatherJsx}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
