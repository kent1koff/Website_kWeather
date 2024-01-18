import React, { useState, useEffect, useCallback } from 'react';
import { fetchData } from '../API';
import { useTheme } from '../../Theme';
import Card from '../Card/Card';
import './5DaysForecast.scss';
import Cookies from 'js-cookie';
import { useMediaQuery } from 'react-responsive';

const FiveDaysForecast = ({ searchValue, onDayClick }) => {
  const [dailyForecasts, setDailyForecasts] = useState([]);
  const { theme } = useTheme();
  const selectedLanguage = Cookies.get('selectedLanguage') || localStorage.getItem('selectedLanguage') || 'UK';

  const groupByDay = useCallback((forecastList, language) => {
    let daysOfWeek;
    if (language === 'Russia') {
      daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    } else if (language === 'Ukraine') {
      daysOfWeek = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота'];
    } else if (language === 'Germany') {
      daysOfWeek = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    } else {
      daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }

    const uniqueDays = forecastList ? Array.from(new Set(forecastList.map(item => daysOfWeek[new Date(item.dt_txt).getDay()]))) : [];
    const firstFiveDays = uniqueDays.slice(0, 5);
    const dailyForecastsData = firstFiveDays.map(day => ({ dayOfWeek: day }));
    return dailyForecastsData;
  }, []);

  useEffect(() => {
    const fetchForecastData = async () => {
      if (searchValue && searchValue !== '') {
        const data = await fetchData(searchValue);
        setDailyForecasts(groupByDay(data.list, selectedLanguage));
      }
    };
  
    fetchForecastData();
  }, [searchValue, selectedLanguage, groupByDay]);

  const handleDayClick = (dayOfWeek) => {
    const currentHour = new Date().getHours();
    const adjustedDay = currentHour >= 0 && currentHour <= 3 ? dayOfWeek+1 : dayOfWeek;
    onDayClick(adjustedDay);
  };

  const is1400 = useMediaQuery({ maxWidth: 1400 });
  const is992 = useMediaQuery({ maxWidth: 992 });
  const is768 = useMediaQuery({ maxWidth: 768 });
  
  let cardWidth = "414px";
  
  if (is1400 && !is992) {
    cardWidth = "873px";
  } else if (is768) {
    cardWidth = "375px";
  } else if (is992) {
    cardWidth = "700px";
  }

  return (
    <Card width={cardWidth}>
      <h3 className={`flex content-Center titleForecast ${theme}`}>{selectedLanguage === 'Russia' ? 'Прогноз на 5 дней:' : selectedLanguage === 'Ukraine' ? 'Прогноз на 5 днів:' : selectedLanguage === 'Germany' ? '5 Tage Vorhersage:' : '5 Days Forecast:'}</h3>
      <div className="flex direction-Column gapForecast items-Center">
      {dailyForecasts.map((forecast, index) => (
        <span key={index} className={`dayForecast ${theme}`} onClick={() => handleDayClick(new Date().getHours() >= 21 && new Date().getHours() <= 23 ? index+1 : index, forecast.dayOfWeek)}>{forecast.dayOfWeek}</span>
      ))}
      </div>
    </Card>
  );
};

export default FiveDaysForecast;