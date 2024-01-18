import React, { useState, useEffect } from 'react';
import '../../../../styles/index.scss';
import './SelectLanguage.scss';
import iconUK from '../../../../images/Header/SelectLanguage/unitedKingdom.png';
import iconRussia from '../../../../images/Header/SelectLanguage/russia.png';
import iconUkraine from '../../../../images/Header/SelectLanguage/ukraine.png';
import iconGermany from '../../../../images/Header/SelectLanguage/germany.png';
import Cookies from 'js-cookie';

const languageIcons = {
  UK: iconUK,
  Russia: iconRussia,
  Ukraine: iconUkraine,
  Germany: iconGermany,
};

const SelectLanguage = ({ onSelectLanguage }) => {
  const [isLanguageVisible, setLanguageVisible] = useState(false);
  const [animateClosing, setAnimateClosing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('UK');

  useEffect(() => {
    const storedLanguage = Cookies.get('selectedLanguage') || localStorage.getItem('selectedLanguage');
    if (storedLanguage && languageIcons[storedLanguage]) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguageVisibility = () => {
    if (isLanguageVisible) {
      setAnimateClosing(true);
      setTimeout(() => {
        setAnimateClosing(false);
        setLanguageVisible(false);
      }, 300);
    } else {
      setLanguageVisible(true);
    }
  };

  const handleSelectLanguage = (language) => {
    setLanguageVisible(false);
    localStorage.setItem('selectedLanguage', language);
    if (localStorage.getItem('cookie') === 'true') {
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      document.cookie = 'cookieVisible=false';
      document.cookie = `selectedLanguage=${language}; expires=${expirationDate.toUTCString()}`;
  }
    setSelectedLanguage(language);
    onSelectLanguage(language);
  };

  useEffect(() => {
    if (isLanguageVisible) {
      setAnimateClosing(false);
    }
  }, [isLanguageVisible]);

  return (
    <>
      <button className={`selectLanguage ${isLanguageVisible ? 'moreLanguages' : ''}`} onClick={toggleLanguageVisibility}>
        <img src={languageIcons[selectedLanguage]} alt={selectedLanguage.toLowerCase()} className="iconSelectLanguageSmall" />
      </button>
      {isLanguageVisible && (
        <div className={`flex columnLanguage direction-Column centrLanguage animate__animated ${animateClosing ? 'animate__zoomOut' : 'animate__zoomInDown'}`}>
          {Object.keys(languageIcons).map((language) => (
            language !== selectedLanguage && (
              <button key={language} className='dropDownLanguages' onClick={() => handleSelectLanguage(language)}>
                <img src={languageIcons[language]} alt={language.toLowerCase()} className="iconSelectLanguageSmall" />
              </button>
            )
          ))}
        </div>
      )}
    </>
  );
};

export default SelectLanguage;