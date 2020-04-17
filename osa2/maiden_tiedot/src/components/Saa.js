import React, { useEffect, useState } from 'react';

import axios from 'axios'

const Saa = ({ capital }) => {
  const [ weather, setWeather ] = useState([])

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${capital}`)
      .then(res => {
        setWeather(res.data)
      })
  }, [capital])

  if (weather.current) {
    return (
      <div>
        <h2>Weather in { capital }</h2> 
        <p>
          <b>temperature:</b> { weather.current.temperature } celsius
        </p>
        <img src={ weather.current.weather_icons[0] } alt="" />
        <p>
          <b>wind: </b> { weather.current.wind_speed } mph direction { weather.current.wind_dir }
        </p>
      </div>
    );
  }

  return (
    <div></div>
  )
};

export default Saa;