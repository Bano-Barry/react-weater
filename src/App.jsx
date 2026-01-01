import { useEffect, useState } from "react";
import loader from "./assets/loader.svg";
import "./App.css";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(`http://api.airvisual.com/v2/nearest_city?key=${API_KEY}`)
      .then((response) => {
        // console.log("response", response);
        return response.json();
      })
      .then((responseData) => {
        // console.log("data", data);
        setWeatherData({
          city: responseData.data.city,
          country: responseData.data.country,
          temperature: responseData.data.current.weather.tp,
          weatherIcon: responseData.data.current.weather.ic,
        });
      });
  }, []);

  return (
    <main>
      <div className={`loader-container ${!weatherData && "active"}`}>
        <img src={loader} alt="loading icon" />
      </div>
      {weatherData && (
        <>
          <p className="city-name">{weatherData?.city}</p>
          <p className="country-name">{weatherData?.country}</p>
          <p className="temperature">{weatherData?.temperature}°</p>
          <div className="info-icon-container">
            <img
              src={`/icons/${weatherData?.weatherIcon}.svg`}
              alt="weather icon"
              className="info-icon"
            />
          </div>
        </>
      )}
    </main>
  );
}

export default App;
