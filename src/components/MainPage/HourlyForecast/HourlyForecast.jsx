import React, { useState, useEffect, useMemo } from 'react';
import Slider from "react-slick";
import Card from "../Card/Card";
import SmallCard from "./SmallCard";
import './HourlyForecast.scss';
import { fetchData } from '../API';
import { useTheme } from '../../Theme';
import Cookies from 'js-cookie';
import { useMediaQuery } from 'react-responsive';

const HourlyForecast = ({ searchValue, selectedDay, onHourlyDataChange }) => {
  const [weatherList, setWeatherList] = useState([]);
  const [clickedId, setClickedId] = useState(0);
  const { theme } = useTheme();
  const selectedLanguage = Cookies.get('selectedLanguage') || localStorage.getItem('selectedLanguage') || 'UK';

  useEffect(() => {
    if (searchValue && searchValue !== '') {
      fetchData(searchValue)
        .then(data => {
          setWeatherList(data.list);
        })
        .catch(error => console.error(error));
    }
  }, [searchValue]);

  const addDaysToDate = (inputDate, numberOfDays) => {
    const [year, month, day] = inputDate.split('-').map(Number);
    const currentDate = new Date(year, month - 1, day);
    currentDate.setDate(currentDate.getDate() + numberOfDays);
    if (new Date().toDateString() === currentDate.toDateString() && new Date().getHours() >= 21) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
  };

  const newDate = addDaysToDate(new Date().toISOString().slice(0, 10), selectedDay);

  const hourlyData = useMemo(() => {
    let count = 0;
    const data = [];
    for (let key in weatherList) {
      if (weatherList[key].dt_txt.substring(0, 10) === newDate) {
        const id = key;
        const timeCard = weatherList[key].dt_txt.substring(11, 16);
        const weatherIconCard = weatherList[key].weather[0].id;
        const tempCard = Math.round(weatherList[key].main.temp);
        const windCard = Math.round(weatherList[key].wind.speed);
        data.push({ timeCard, weatherIconCard, tempCard, windCard, id });
        count++;
      }
    }
    return { data, count };
  }, [weatherList, newDate]);

  const handleCardClick = (id) => {
    setClickedId(id);
    onHourlyDataChange({id});
  };

  useEffect(() => {
    onHourlyDataChange(clickedId);
  }, [clickedId, onHourlyDataChange]);

  const { data, count } = hourlyData;

  const sliderSettings = {
    infinite: false,
    speed: 500,
    arrows: true,
  };
  
  if (window.innerWidth <= 768) {
    sliderSettings.slidesToShow = 1;
  } else if (window.innerWidth <= 992) {
    sliderSettings.slidesToShow = 3;
  } else {
    sliderSettings.slidesToShow = 5;
  }

  const is1400 = useMediaQuery({ maxWidth: 1400 });
  const is992 = useMediaQuery({ maxWidth: 992 });
  const is768 = useMediaQuery({ maxWidth: 768 });
  
  let cardWidth = "870px";
  
  if (is1400 && !is992) {
    cardWidth = "873px";
  } else if (is768) {
    cardWidth = "375px";
  } else if (is992) {
    cardWidth = "700px";
  }

  return (
    <Card width={cardWidth}>
      <h3 className={`titleForecast flex content-Center ${theme}`}>{selectedLanguage === 'Russia' ? 'Почасовой прогноз:' : selectedLanguage === 'Ukraine' ? 'Погодинний прогноз:' : selectedLanguage === 'Germany' ? 'Stündliche Vorhersage:' : 'Hourly forecast:'}</h3>
      {count < 5 ? (
      <div className='flex content-Center gapCards'>
      {data.map((item, index) => (
        <SmallCard key={index} time={item.timeCard} weatherIdIcon={item.weatherIconCard} temp={item.tempCard} wind={item.windCard} weatherIdCount={data[index].timeCard.substring(0, 2)} onCardClick={() => handleCardClick(item.id)}/>
      ))}
      </div>
      ) : (
      <Slider {...sliderSettings}>
      {data.map((item, index) => (
        <SmallCard key={index} time={item.timeCard} weatherIdIcon={item.weatherIconCard} temp={item.tempCard} wind={item.windCard} weatherIdCount={data[index].timeCard.substring(0, 2)} onCardClick={() => handleCardClick(item.id)}/>
      ))}
      </Slider>
      )}
    </Card>
  );
};

export default HourlyForecast;