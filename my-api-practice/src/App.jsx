import { useState } from "react";
import CityInput from "./components/CityInput";
import "./index.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🌤 Weather App
        </h1>

        <CityInput
          city={city}
          setCity={setCity}
          onSearch={fetchWeatherData}
        />

        {loading && (
          <p className="text-center text-gray-500 mt-4">
            Fetching weather...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 mt-4">
            {error}
          </p>
        )}

        {weather && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              {weather.name}
            </h2>

            <p className="text-6xl font-bold text-blue-500 my-4">
              {Math.round(weather.main.temp)}°
            </p>

            <p className="capitalize text-gray-600">
              {weather.weather[0].description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-gray-500">Humidity</p>
                <p className="font-semibold">
                  {weather.main.humidity}%
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-gray-500">Wind</p>
                <p className="font-semibold">
                  {weather.wind.speed} m/s
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
