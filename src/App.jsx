import React, { useState } from 'react';

const WeatherApp = () => {
  const [ciudades, setCiudades] = useState([]);
  let ciudad,
    location,
    current;
  let name, region, country;
  let temp_c, wind_kph, wind_dir, humidity, pressure_in, condition;
  let icon, text;

  const getWeather = async (city) => {
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + city;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '1592e28623msha1546bdbbb37bf4p1bec8djsn65cf0e56a3df',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const getInput = async () => {
    if (!ciudad) return;
    const newPlace = await getWeather(ciudad);
    // console.log(newPlace)
    location = newPlace.location;
    current = newPlace.current;

    name = location.name;
    region = location.region;
    country = location.country;

    temp_c = current.temp_c;
    wind_kph = current.wind_kph;
    wind_dir = current.wind_dir;
    humidity = current.humidity;
    pressure_in = current.pressure_in;
    condition = current.condition;

    icon = condition.icon;
    text = condition.text;

    const newCity = {
      name,
      region,
      country,
      temp_c,
      wind_kph,
      wind_dir,
      humidity,
      pressure_in,
      icon,
      text,
    };
    setCiudades([newCity, ...ciudades]);
    ciudad = '';
  };

  return (
    
    <div className="container">
      <h1 className='title' style={{ color: 'black' }}>Weather App</h1>
      <header className="container-header">
        <input
          className="input"
          type="text"
          value={ciudad}
          onChange={(e) => (ciudad = e.target.value)}
        />
        <button className="btn" onClick={getInput}>
          Añadir ciudad
        </button>
      </header>
      <main className="container-main">
        {ciudades.map((ciudad) => (
          <article key={ciudad.name} className="card">
            <div className="card-header">
              <div className="card-header-icon">
                <img
                  src={`https:${ciudad.icon}`}
                  alt="icon weather api"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="card-header-info">
                <p className="card-header-info-condition">{ciudad.text}</p>
                <p className="card-header-info-temp">
                  {ciudad.temp_c}
                  <span>º</span>
                </p>
                <p className="card-header-info-city">
                  {ciudad.name}, {ciudad.region}, {ciudad.country}
                </p>
              </div>
            </div>
            <div className="card-body">
              <p className="card-body-info-wind">
                Wind: <span>{ciudad.wind_dir} {ciudad.wind_kph} km/h</span>
              </p>
              <p className="card-body-info-humidity">
                Humidity: <span>{ciudad.humidity}%</span>
              </p>
              <p className="card-body-info-pressure">
                Pressure: <span>{ciudad.pressure_in} in</span>
              </p>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default WeatherApp;