import React, { useState, useEffect } from 'react';
import InfoCity from "./InfoCity/InfoCity";
import WeatherNow from "./WeatherNow/WeatherNow";
import FiveDaysForecast from "./5DaysForecast/5DaysForecast";
import HourlyForecast from "./HourlyForecast/HourlyForecast";
import Switch from "./Header/Switch/Switch";
import Search from "./Header/Search/Search";
import SelectLanguage from "./Header/SelectLanguage/SelectLanguage";
import IconWeather from "./IconWeather";
import Container from '../Container/Container';
import Cookie from '../Cookie/Cookie';
import { useTheme } from '../Theme';
import { fetchData } from './API';
import smile from '../../images/Header/smile.png'
import Cookies from 'js-cookie';

const Main_Page = () => {
  const [searchValue, setSearchValue] = useState('');
  const [, setSelectedLanguage] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMainVisible, setIsMainVisible] = useState(true);
  const [errorSearch, setErrorSearch] = useState(false);
  const { theme } = useTheme();
  const setIsLoadingCount = useState(0)[1];
  const setInitialLoad = useState(true)[1];
  const setShowMain = useState(false)[1];

  document.body.className = theme;
  const selectedLanguage = Cookies.get('selectedLanguage') || localStorage.getItem('selectedLanguage') || 'UK';

  const handleSearchValueChange = (value) => {
    setSearchValue(value);
  };

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const handleDayClick = (selectedDay) => {
    setSelectedDay(selectedDay);
  };

  const handleHourlyDataChange = (hourlyData) => {
    setHourlyData(hourlyData);
  };

  useEffect(() => {
    const handleDataAndDisplay = (data) => {
      setShowMain(false);
      setIsMainVisible(false);
      if (data === '404') {
        setIsLoading(false);
        setInitialLoad(false);
        setErrorSearch(true);
      } else {
        setIsLoading(true);
        setErrorSearch(false);
        setIsLoading(false);
        setShowMain(true);
        setIsMainVisible(true);
      }
    };

    setIsMainVisible(false);

    const fetchDataAndHandleLoading = async () => {
      if (searchValue) {
        setIsLoading(true);
        try {
          const data = await fetchData(searchValue);
          handleDataAndDisplay(data.cod);
        } catch (error) {
          console.error(error)
        }
      }
    };

    fetchDataAndHandleLoading();
  }, [searchValue, setIsLoadingCount, setInitialLoad, setShowMain]);

  return (
    <>
      <Cookie />
      <Container>
      <header className="flex content-SpaceBetween">
        <Switch />
        <Search onSearchValueChange={handleSearchValueChange} />
        {errorSearch &&
        <div className='flex errorSearch items-Center'>
          <img src={smile} alt='smile' className='smileError' />
          <span className={`errorSearchText ${theme}`}>{selectedLanguage === 'Russia' ? ' По вашему запросу ничего не найдено.' : selectedLanguage === 'Ukraine' ? 'За вашим запитом нічого не знайдено.' : selectedLanguage === 'Germany' ? 'Für Ihre Anfrage wurde nichts gefunden.' : 'Nothing was found for your request.'}</span>
        </div>}
        <SelectLanguage onSelectLanguage={handleSelectLanguage} />
        </header>
        {isLoading && <div className={`loader ${theme}`}></div>}
        <main className={`wrap-Wrap animate__animated animate__zoomIn`} style={{ display: isMainVisible ? 'flex' : 'none' }}>
          <InfoCity searchValue={searchValue} hourlyData={hourlyData}/>
          <WeatherNow searchValue={searchValue} hourlyData={hourlyData}>
            <IconWeather />
          </WeatherNow>
          <FiveDaysForecast searchValue={searchValue} onDayClick={handleDayClick} />
          <HourlyForecast searchValue={searchValue} selectedDay={selectedDay} onHourlyDataChange={handleHourlyDataChange} />
        </main>
      </Container>
    </>
  );
};

export default Main_Page;