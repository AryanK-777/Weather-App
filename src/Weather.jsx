import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY ='e8239b1b90bea6d4c011fb1f800d96ce';

function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity]       = useState('London');
  const [input, setInput]     = useState('London');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  useEffect(() => { 
  const fetchWeather = async () => {
    // setLoading(true);
    // setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log(response)
      setWeather(response.data);
    }catch (err) {
  console.error("API Error:", err);
  if (err.response) {
    console.error("Response Data:", err.response.data);
  }
  setError("City not found or API request failed.");
  setWeather(null);
}

  };

  fetchWeather();
}, [city]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) setCity(input.trim());
  };

  return (
    <div className="app-container">
      <div className="bg-animation"></div>
      <form className="weather-card" onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Go</button>

        {loading && <p>Loading…</p>}
        {error   && <p style={{ color: 'red' }}>{error}</p>}

        {weather && !error && (
          <div>
            <h2>{weather.name}</h2>
            <p>
              {weather.main.temp}°C • {weather.weather[0].description}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
export default Weather