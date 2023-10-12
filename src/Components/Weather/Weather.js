// import React from 'react'

import './Weather.css';

function Weather({weatherDetails}) {
    console.log('weatherData ', weatherDetails);


    // const kelvinToCelcius = (f) => {
    //     return Math.round(f-273.15);
    // }

    const temp = weatherDetails.main.temp ;
    const max_temp = weatherDetails.main.temp_max ;
    const min_temp = weatherDetails.main.temp_min ;
    const feels_like = weatherDetails.main.feels_like ;

    const humidity = weatherDetails.main.humidity;

    const weatherIcon = weatherDetails.weather[0].icon;
    const windSpeed = weatherDetails.wind.speed
    const iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`


  return (
    <div className="weather_details">
        <img alt="weather icon" src={iconUrl} width={100} height={100}/>
        <h2>{weatherDetails.name}</h2>
        
        <p className='temparture'>{temp}&deg; C</p>
        <h3 style={{marginTop: '10px'}}>{weatherDetails.weather[0].main}</h3>
        <p>H : {max_temp}&deg; C || L : {min_temp}&deg; C</p>
        <p>Feels Like: {feels_like}&deg; C</p>
        <p>Wind speed: {windSpeed} km/second</p>

    </div>
  )
}

export default Weather