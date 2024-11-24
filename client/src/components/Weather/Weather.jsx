import React, { useEffect, useState } from 'react'
import services from '../../api/api';
import { TiWeatherCloudy, TiWeatherSunny } from "react-icons/ti";

const Weather = ({ city }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            if (city) {
                await services.weatherAPI.getWeatherByCity(city, setWeather);
            }
        };

        fetchWeather();
    }, [city]);

    return (
        <div className='weatherCard'>
            <p className='cityName' >{city} Weather</p>
            {weather ? (
                <div className='weatherContent'>
                    <div className="weatherLeft">
                        <p className='temperature'>
                            {weather.main.temp > 25 ? <TiWeatherSunny style={{ marginRight: '10px' }} size={30} /> : <TiWeatherCloudy style={{ marginRight: '10px' }} size={30} />}
                            {weather.main.temp} °C
                        </p>
                        <p className='description'>{weather.weather[0].description}</p>
                        <p className='feelsLike'>Feels Like: {weather.main.feels_like} °C</p>
                    </div>
                    <div className="weatherRight">
                        <p className='humidity'>Humidity: {weather.main.humidity} %</p>
                        <p className='pressure'>Pressure: {weather.main.pressure} hPa</p>
                        <p className='windSpeed'>Wind Speed: {weather.wind.speed} m/s</p>
                        <p className='windGust'>Wind Gust: {weather.wind.gust} m/s</p>
                    </div>
                </div>
            ) : (
                ("Loading...")
            )}
        </div>
    );
};

export default Weather