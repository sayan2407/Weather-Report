// import React from 'react'

import { useEffect, useState } from "react"
import Loadingbar from "../LoadingBar/Loadingbar";

import './Home.css';

import axios from 'axios';
import Weather from "../Weather/Weather";

import api from "../../ApiKey";
import SearchIcon from '@mui/icons-material/Search';

function Home() {
  console.log('api=> ', api);
    const [ latitude, setLatitude ] = useState(null);
    const [ longitude, setLongitude ] = useState(null);

    const [ getLocation, setGetLocation ] = useState(false);

    const [weatherData, setWeatherData] = useState({});

    const [cityname, setCityName] = useState(null);


    const API_KEY = "0b099ae6d0e7471799cdcb6cf04b0db3";



    useEffect(()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
              fetchWeatherdata(position.coords.latitude, position.coords.longitude)

            }, (error) => {
              console.error("Error getting geolocation:", error);
            });
          } else {
            console.error("Geolocation is not supported by this browser.");
          }
    }, []);

    const fetchWeatherdata = async ( lat, lon ) => {
        try {
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

            console.log('apiUrl ', apiUrl);

            const weatherResponse = await axios.get(apiUrl).then(res=>{
              if (res.status === 200) {
                return res;
              } else {
                alert('Something went wrong');
              }
            });
            console.log('weatherResponse ', weatherResponse.data);
            setWeatherData(weatherResponse.data);
            setGetLocation(true);

          } catch(e) {
            console.error("Error fetching weather data:", e);

          }
    }

    const searchReportByCity = async () => {
      if ( cityname ) {

        try {
          let apiUrl = `${api.base}weather?q=${cityname}&units=metric&APPID=${api.apiKey}`

          let cityWeather = await axios(apiUrl).then(res=>{
            if (res.status === 200) {
              return res;
            }
          }).catch(e=>{
            let errorMsg = {
              data: {
                cod: 404,
                message : e.message
              }
            }
            return errorMsg;
          }) 
          if (cityWeather.data.cod == 200) {
            setWeatherData(cityWeather.data);
          } else {
            alert(cityWeather.data.message);
          }

        } catch(err) {

        }

      } else {
        alert('City name Not Valid');
      }
      console.log(cityname);
    }


  return (
    <div className="dashboard">
        {
            (!getLocation) ? (
                <Loadingbar/>
            ) : (
                <div className="report_card">
                    
                    <h1>Weather Report</h1>
                    <p>Welcome to the Weather Portal</p>
                    <div className="search_city" >
                    <input onChange={(e)=>setCityName(e.target.value)} placeholder="Enter city" />
                    <SearchIcon onClick={searchReportByCity} style={{cursor: 'pointer', padding: '8px'}}/>
                    </div>
                    
                    <Weather weatherDetails={weatherData}/>

                </div>
            )
        }

    </div>
  )
}

export default Home