import React, { useEffect, useState, usseEffect } from 'react';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState(false);
  const [location, setLocation] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);

    console.log(res.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      
      const lati = position.coords.latitude;
      const long = position.coords.longitude;

      getWeather(lati, long);

      setLocation(true);
    });
  }, []);

  if (location === false) {
    return (
      <div>Habilite a localização para saber o clima o/</div>
    );
  } else if( weather === false ) {
    return(<div></div>);
  } else {
    return (
      <div className="App">
      <div className="container">
          <h3>Clima nas suas coordenadas ({weather['weather'][0]['description']})</h3>
          <hr />
          <ul>
            <li>Temperatura atual {weather['main']['temp']}°</li>
            <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
            <li>Temperatura mínima: {weather['main']['temp_min']}°</li>
            <li>Pressão:  {weather['main']['pressure']} hpa</li>
            <li>Umidade: {weather['main']['humidity']}%</li>
          </ul>
      </div>
      </div>
    )
  }
}

export default App;
