import React, { useState, useEffect } from 'react';
import sprite from '../../../../images/sprite.svg';
import './Search.scss';
import { useTheme } from '../../../Theme';
import Cookies from 'js-cookie';

const Search = ({ onSearchValueChange}) => {
  const [inputValue, setInputValue] = useState('');
  const [city, setCity] = useState('');
  const { theme } = useTheme();
  const selectedLanguage = Cookies.get('selectedLanguage') || localStorage.getItem('selectedLanguage') || 'UK';

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchValueChange(inputValue);
    setInputValue('');
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = `${position.coords.latitude},${position.coords.longitude}`;
          fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${process.env.REACT_APP_API_KEY_GEOCODE}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.status);
              }
              return response.json();
            })
            .then(data => {
              setCity(data.results[0].components.town);
            })
            .catch(error => console.error(error));
        }
      )
    }
  }

  useEffect(() => {
    if (city) {
      setInputValue(city);
      onSearchValueChange(city);
      setCity('');
      setInputValue('');
    }
  }, [city, onSearchValueChange]);

  return (
    <>
    <form className='rowInputHeader' onSubmit={handleSubmit}>
      <button className='buttonHeaderSearch' type="submit">
        <svg className='search'>
          <use href={`${sprite}#search`}></use>
        </svg>
      </button>
      <input type="text" placeholder={selectedLanguage === 'Russia' ? 'Найдите нужный вам город...' : selectedLanguage === 'Ukraine' ? 'Знайдіть потрібне вам місто...' : selectedLanguage === 'Germany' ? 'Finden Sie eine Stadt...' : 'Find the right city...'} className={`inputHeader ${theme}`} value={inputValue} onChange={handleInputChange} />
      <button className='buttonLocation' onClick={handleLocationClick}>
        <svg className='currentLocation'>
          <use href={`${sprite}#${theme === 'dark' ? 'currentLocation_light' : 'currentLocation'}`}></use>
        </svg>
      </button>
    </form>
    </>
  )
}

export default Search;