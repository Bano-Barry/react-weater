import { useEffect, useState } from "react";
import loader from "./assets/loader.svg";
import "./App.css";
import browser from "./assets/browser.svg";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    fetch(`http://api.airvisual.com/v2/nearest_city?key=${API_KEY}`)
      .then((response) => {
        // console.log("response", response);
        if (!response.ok)
          throw new Error(`Error ${response.status} : ${response.statusText}`);
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
      })
      .catch((error) => {
        // console.log("Une erreur est survenue:", error);
        setErrorInfo(error.message);
      });
  }, []);

  return (
    <main>
      <div
        className={`loader-container ${!weatherData && !errorInfo && "active"}`}
      >
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

      {errorInfo && !weatherData && (
        <>
          <p className="error-information">{errorInfo}</p>
          <img src={browser} alt="error icon" className="error-icon" />
        </>
      )}
    </main>
  );
}

export default App;
