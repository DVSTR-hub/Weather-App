import React, { useState } from 'react';
import './App.css';
import { Weather } from './Weather';

function App() {

  //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  //мой апи ки = dadbafbf7a2714deca2703909a269493


  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<null | string>(null);
  const [weather, setWeather] = useState<{ temp: number, description: string, humidity: number, speed: number } | null>(null);
  //console.log(weather);

  const fetchWeather=()=>{

    //const city = 'Minsk';
    const apiKey = 'dadbafbf7a2714deca2703909a269493';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === "404") {
        setError('City not found'); // Устанавливаем ошибку, если город не найден
      } else {
          setWeather({
              temp: json.main.temp,
              description: json.weather[0].description,
              humidity: json.main.humidity,
              speed: json.wind.speed
          })
          setError(null); // Сбрасываем ошибку, если запрос успешен
        }
    })

    .catch(error => {
      console.error('Ошибка:', error);
      setError('An error occurred'); // Общая ошибка на случай других проблем (а именно если отвалился интернет)
    });
    
  }


  return (
    <div className="App">
     <h1>Weather App</h1>
     <div>
      <input type="text" onChange={(e)=>setCity(e.currentTarget.value)} />
      <button onClick={fetchWeather}>Get Weather</button>
     </div>
     {weather && <Weather temp={Math.round((weather.temp-273)*100)/100} description={weather.description} humidity={weather.humidity} speed={weather.speed} />}
     {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем ошибку. Тут используется УСЛОВНЫЙ РЕНДЕРИНГ – иногда нужно что-то отрисовывать, а иногда нет. То есть если у нас ошбибка error есть, то рисуем эту error красным цветом. А если нет, то не рисуемо :) && = давай рисуй тогда  */}
    </div>
  );
}

export default App;
