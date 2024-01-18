import React, { useEffect, useState } from 'react';
import './Switch.scss';
import { useTheme } from '../../../Theme';
import Cookies from 'js-cookie';

const Switch = () => {
  const { theme, toggleTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const selectedLanguage = Cookies.get('selectedLanguage') || localStorage.getItem('selectedLanguage') || 'UK';

  useEffect(() => {
    const isDaytime = new Date().getHours() >= 8 && new Date().getHours() < 20;

    if (!userToggled) {
      setIsChecked(!isDaytime);
    }
  }, [userToggled]);

  const handleToggle = () => {
    setUserToggled(true);
    toggleTheme();
    setIsChecked((prev) => !prev);
  };

  return (
    <div className='flex direction-Column items-Center blockSwitch'>
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
      <span className={`textSwitchHeader ${theme}`}>{selectedLanguage === 'Russia' ? theme === 'dark' ? 'Темная Тема' : 'Светлая Тема' : selectedLanguage === 'Ukraine' ? theme === 'dark' ? 'Темна Тема' : 'Світла Тема' : selectedLanguage === 'Germany' ? theme === 'dark' ? 'Dunkles Thema' : 'Helles Thema' : theme === 'dark' ? 'Dark Theme' : 'Light Theme'}</span>
    </div>
  );
};

export default Switch;