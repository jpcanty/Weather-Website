import React, { useState } from 'react';
const weather_map_api = {
  key: "69f5622ea693e1adfea3c6407207bb9f",
  base: "https://api.openweathermap.org/data/2.5/"
}
const thingspeak_api = {
  key: "6OKMFXMALH1QI7J4",
  base: "https://api.thingspeak.com/channels/1411578/feeds.json"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  console.log(query);
  if (query === "Chicago") {
    fetch(`${thingspeak_api.base}?api_key=${thingspeak_api.key}&results=5`)
      .then(res => res.json())
      .then(result => console.log(result))
  }
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${weather_map_api.base}weather?q=${query}&units=imperial&APPID=${weather_map_api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <h1>Live Updates from OpenWeatherMap.com</h1>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°F
         </div>
              <div className="temp_min">
                <h4>Min Temperature : </h4>{Math.round(weather.main.temp_min)}°F
         </div>


              <div className="temp_max">
                <h4>Max temperature : </h4>{Math.round(weather.main.temp_max)}°F
         </div>
              <div className="humidity">
                <h4>Humidity : </h4>{Math.round(weather.main.humidity)}%
         </div>
              <div className="pressure">
                <h4>Pressure : </h4>{Math.round(weather.main.pressure)}
              </div>
              <div className="speed">
                <h4>Wind Speed: </h4>{Math.round(weather.wind.speed)}mph
         </div>
              <div className="gust">
                <h4>Wind gust: </h4>{Math.round(weather.wind.gust)}mph
         </div>

              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
        <div>
          <h1> Recordings from our local station {""}</h1>
          <hr />
          <hr />
          <h2>Temperature Recordings</h2>
          <iframe width="450" height="260" src="https://thingspeak.com/channels/1411578/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Temperature&type=line"></iframe>
          <h2>Humidity Recordings</h2>
          <iframe width="450" height="260" src="https://thingspeak.com/channels/1411578/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Humidity&type=line"></iframe>
          <h2>Wind Speed Recordings</h2>
          <iframe width="450" height="260" src="https://thingspeak.com/channels/1411578/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Wind+Speed&type=line"></iframe>
          <h2>Storm Proximity Recordings</h2>
          <iframe width="450" height="260" src="https://thingspeak.com/channels/1411578/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Storm+Proximity&type=line"></iframe>
          <h2>Storm Intensity Recordings</h2>
          <iframe width="450" height="260" src="https://thingspeak.com/channels/1411578/charts/5?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe>
        </div>
      </main>
    </div>
  );
};
export default App;
