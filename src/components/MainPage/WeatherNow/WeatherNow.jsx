import Card from "../Card/Card";
import './WeatherNow.scss';
import sprite from '../../../images/sprite.svg';
import { fetchData } from '../API';
import React, { useState, useEffect } from 'react';
import IconWeather from "../IconWeather";
import { useTheme } from '../../Theme';
import Cookies from 'js-cookie';
import { useMediaQuery } from 'react-responsive';

const WeatherNow = ({ searchValue, hourlyData }) => {
  const [tempNow, setTemperatureNow] = useState(null);
  const [tempNowFeelsLike, setTempNowFeelsLike] = useState(null);
  const [sunriseToday, setSunriseToday] = useState(null);
  const [sunsetToday, setSunsetToday] = useState(null);
  const [humidityNow, setHumidityNow] = useState(null);
  const [windSpeedNow, setWindSpeedNow] = useState(null);
  const [pressureNow, setPressureNow] = useState(null);
  const [visibilityNow, setVisibilityNow] = useState(null);
  const [weatherID, setWeatherID] = useState(null);
  const [iconForIconWeather, setIconForIconWeather] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [lastCity, setLastCity] = useState(null);
  const { theme } = useTheme();
  const selectedLanguage = Cookies.get('selectedLanguage') || localStorage.getItem('selectedLanguage') || 'UK';

  useEffect(() => {
    if (searchValue !== '') {
      fetchData(searchValue)
        .then(data => {
          const city = data.city.name;
          if (hourlyData.id !== undefined || tempNow === null || city !== lastCity) {
            const iconForIconWeather = data.list[hourlyData.id || '0'].dt_txt.substring(11, 13);
            const tempNow = `${Math.round(data.list[hourlyData.id || 0].main.temp)}°C`;
            const tempNowFeelsLike = `${Math.round(data.list[hourlyData.id || 0].main.feels_like)}°C`;
            const sunriseToday = `${new Date(data.city.sunrise * 1000 + (data.city.timezone * 1000) - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} AM`;
            const sunsetToday = `${new Date(data.city.sunset * 1000 + (data.city.timezone * 1000) - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} PM`;
            const weatherID = data.list[hourlyData.id || 0].weather[0].id;
            const humidityNow = `${data.list[hourlyData.id || 0].main.humidity}%`;
            const windSpeedNow = data.list[hourlyData.id || 0].wind.speed.toFixed(1);
            const pressureNow = data.list[hourlyData.id || 0].main.pressure;
            const visibilityNow = data.list[hourlyData.id || 0].visibility;
            const lastCity = data.city.name;
            setLastCity(lastCity);
            setCityName(city);
            setTemperatureNow(tempNow);
            setTempNowFeelsLike(tempNowFeelsLike);
            setSunriseToday(sunriseToday);
            setSunsetToday(sunsetToday);
            setHumidityNow(humidityNow);
            setWindSpeedNow(windSpeedNow);
            setPressureNow(pressureNow);
            setVisibilityNow(visibilityNow);
            setWeatherID(weatherID);
            setIconForIconWeather(iconForIconWeather);
          }
        })
        .catch(error => error);
    }
  }, [searchValue, hourlyData, tempNow, cityName, lastCity]);

  const is1400 = useMediaQuery({ maxWidth: 1400 });
  const is992 = useMediaQuery({ maxWidth: 992 });
  const is768 = useMediaQuery({ maxWidth: 768 });
  let cardWidth = "780px";
  let heightResponsive = "330px";
  
  if (is1400 && !is992) {
    cardWidth = "873px";
  } else if (is768) {
    cardWidth = "375px";
    heightResponsive = "840px";
  } else if (is992) {
    cardWidth = "700px";
  }

  return (
    <Card width={cardWidth} height={heightResponsive}>
      <div className="flex infoCardWeatherNow content-Space-evenly">
        <div className="flex direction-Column items-Center firstSection">
          <span className={`mainTempWeatherNow ${theme}`}>{tempNow}</span>
          <div className="flex items-Center feelsLike">
            <span className={`feelsLikeWeatherNow ${theme}`}>{selectedLanguage === 'Russia' ? 'Ощущается: ' : selectedLanguage === 'Ukraine' ? 'Відчувається: ' : selectedLanguage === 'Germany' ? 'Fühlt sich an: ' : 'Feels like: '}</span>
            <span className={`feelsLikeTextWeatherNow ${theme}`}>{tempNowFeelsLike}</span>
          </div>
          <div className="flex row_sun content-Center">
            <svg className='sun'>
              <use href={`${sprite}#${theme === 'dark' ? 'sunrise' : 'sunrise_light'}`}></use>
            </svg>
            <div className="flex direction-Column">
              <p className={theme}>{selectedLanguage === 'Russia' ? 'Восход' : selectedLanguage === 'Ukraine' ? 'Схід' : selectedLanguage === 'Germany' ? 'Sonnenaufgang' : 'Sunrise'}</p>
              <span className={`sunTime ${theme}`}>{sunriseToday}</span>
            </div>
          </div>
          <div className="flex row_sun content-Center">
            <svg className='sun'>
              <use href={`${sprite}#${theme === 'dark' ? 'sunset' : 'sunset_light'}`}></use>
            </svg>
            <div className="flex direction-Column">
              <p className={theme}>{selectedLanguage === 'Russia' ? 'Закат' : selectedLanguage === 'Ukraine' ? 'Захід' : selectedLanguage === 'Germany' ? 'Sonnenuntergang' : 'Sunset'}</p>
              <span className={`sunTime ${theme}`}>{sunsetToday}</span>
            </div>
          </div>
        </div>
        <IconWeather weatherIdIcon={weatherID} className="iconWeatherBig" weatherIdCount={iconForIconWeather} />
        <div className="flex thirdSection direction-Column">
          <div className="flex rowWeather">
            <div className="flex direction-Column items-Center gapWeatherInfo">
              <svg className='humidity'>
                <use href={`${sprite}#${theme === 'dark' ? 'humidity' : 'humidity_light'}`}></use>
              </svg>
              <p className={theme}>{humidityNow}</p>
              <small className={theme}>{selectedLanguage === 'Russia' ? 'Влажность' : selectedLanguage === 'Ukraine' ? 'Вологість' : selectedLanguage === 'Germany' ? 'Feuchte' : 'Humidity'}</small>
            </div>
            <div className="flex direction-Column items-Center gapWeatherInfo">
              <svg className='wind'>
                <use href={`${sprite}#${theme === 'dark' ? 'wind' : 'wind_light'}`}></use>
              </svg>
              <p className={theme}>{windSpeedNow}{selectedLanguage === 'Russia' ? 'м/с' : selectedLanguage === 'Ukraine' ? 'м/с' : selectedLanguage === 'Germany' ? 'm/s': 'm/s'}</p>
              <small className={theme}>{selectedLanguage === 'Russia' ? 'Ск. ветра' : selectedLanguage === 'Ukraine' ? 'Шв. вітру' : selectedLanguage === 'Germany' ? 'Windstärke' : 'Wind Speed'}</small>
            </div>
          </div>
          <div className="flex rowWeather">
            <div className="flex direction-Column items-Center gapWeatherInfo">
              <svg className='pressure'>
                <use href={`${sprite}#${theme === 'dark' ? 'pressure' : 'pressure_light'}`}></use>
              </svg>
              <p className={theme}>{pressureNow}{selectedLanguage === 'Russia' ? 'гПа' : selectedLanguage === 'Ukraine' ? 'гПа' : selectedLanguage === 'Germany' ? 'hPa': 'hPa'}</p>
              <small className={theme}>{selectedLanguage === 'Russia' ? 'Давление' : selectedLanguage === 'Ukraine' ? 'Тиск' : selectedLanguage === 'Germany' ? 'Druck' : 'Pressure'}</small>
            </div>
            <div className="flex direction-Column items-Center gapWeatherInfo">
              <svg className='visibility'>
                <use href={`${sprite}#${theme === 'dark' ? 'visibility' : 'visibility_light'}`}></use>
              </svg>
              <p className={theme}>{visibilityNow}{selectedLanguage === 'Russia' ? 'м' : selectedLanguage === 'Ukraine' ? 'м' : selectedLanguage === 'Germany' ? 'm': 'm'}</p>
              <small className={theme}>{selectedLanguage === 'Russia' ? 'Видимость' : selectedLanguage === 'Ukraine' ? 'Видимість' : selectedLanguage === 'Germany' ? 'Sichtweite' : 'Visibility'}</small>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherNow;