import Card from "../Card/Card";
import './InfoCity.scss';
import { fetchData } from '../API';
import React, { useState } from 'react';
import { useTheme } from '../../Theme';
import Cookies from 'js-cookie';
import { useMediaQuery } from 'react-responsive';

const InfoCity = ({ searchValue, hourlyData }) => {
  const [cityName, setCityName] = useState(null);
  const [timeSmallCard, setTimeSmallCard] = useState(false);
  const [fullDate, setFullDate] = useState(null);
  const { theme } = useTheme();
  const selectedLanguage = Cookies.get('selectedLanguage') || localStorage.getItem('selectedLanguage') || 'UK';

  if (searchValue && searchValue !== '') {
  fetchData(searchValue)
    .then(data => {
      const city = data.city.name;
      const timeSmallCard = String(data.list[hourlyData || 0].dt_txt.slice(11, 16));
      const fullDate = String(data.list[hourlyData || 0].dt_txt.slice(0, 10));
      setCityName(city);
      setTimeSmallCard(timeSmallCard);
      setFullDate(fullDate);
    })
    .catch(error => error);
  }

  const day = new Date(fullDate).getDate();
  const month = new Date(fullDate).toLocaleString(`${selectedLanguage === 'Russia' ? 'ru-RU' : selectedLanguage === 'Ukraine' ? 'uk-UA' : selectedLanguage === 'Germany' ? 'de-DE': 'en-US'}`, { month: 'short' });
  const formattedDate = new Intl.DateTimeFormat(`${selectedLanguage === 'Russia' ? 'ru-RU' : selectedLanguage === 'Ukraine' ? 'uk-UA' : selectedLanguage === 'Germany' ? 'de-DE': 'en-US'}`, { weekday: 'long' }).format(new Date(fullDate));
  const resultTime = `${formattedDate[0].toUpperCase()}${formattedDate.slice(1)}, ${day} ${month[0].toUpperCase()}${month.slice(1)}`;
  const is1400 = useMediaQuery({ maxWidth: 1400 });
  const is992 = useMediaQuery({ maxWidth: 992 });
  const is768 = useMediaQuery({ maxWidth: 768 });
  let cardWidth = "510px";
  
  if (is1400 && !is992) {
    cardWidth = "873px";
  } else if (is768) {
    cardWidth = "375px";
  } else if (is992) {
    cardWidth = "700px";
  }

  return (
  <Card width={cardWidth}>
    <div className="infoCardInfoCity flex direction-Column items-Center">
      <h3 className={theme}>{cityName}</h3>
      <h1 className={theme}>{timeSmallCard}</h1>
      <span className={`dateInfoCity ${theme}`}>{resultTime}</span>
    </div>
  </Card>
  )
}

export default InfoCity;