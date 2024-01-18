import './HourlyForecast.scss';
import IconWeather from '../IconWeather';
import { useTheme } from '../../Theme';
import Cookies from 'js-cookie';

const SmallCard = ({ time, weatherIdIcon, temp, wind, weatherIdCount, onCardClick }) => {
  const { theme } = useTheme();
  const selectedLanguage = Cookies.get('selectedLanguage') || localStorage.getItem('selectedLanguage') || 'UK';

  const handleClick = () => {
    onCardClick(weatherIdCount);
  };

  return (
    <div className={`smallCard flex direction-Column items-Center ${theme === 'dark' ? theme : time.substring(0, 2) === '18' || time.substring(0, 2) === '21' || time.substring(0, 2) === '00' || time.substring(0, 2) === '03' ? 'darkCard' : 'yellowCard'}`} onClick={handleClick}>
      <span className='hForecastTime'>{time}</span>
      <IconWeather weatherIdIcon={weatherIdIcon} className="middleIconWeather" weatherIdCount={weatherIdCount} />
      <span className='hForecastText'>{temp}°C</span>
      <span className='hForecastText'>{wind}{selectedLanguage === 'Russia' ? 'м/с' : selectedLanguage === 'Ukraine' ? 'м/с' : selectedLanguage === 'Germany' ? 'm/s': 'm/s'}</span>
    </div>
  );  
};

export default SmallCard;