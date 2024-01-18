import './Cookie.scss';
import { useTheme } from '../Theme';
import cookiePhoto from '../../images/Header/cookie.png';

const Cookie = () => {
  const { theme } = useTheme();
  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'UK';

  let cookieVisibleDiv = '';
  if (document.cookie.split(' ')[1] !== undefined) {
    cookieVisibleDiv = document.cookie.split(' ')[1].slice(-5);
  }

  if (cookieVisibleDiv === 'false' || localStorage.getItem('cookieVisible') === 'false') {
    document.querySelectorAll('.cookie').forEach(cookie => {
      cookie.style.display = 'none';
    });
  }

  const handleButtonClick = (buttonType) => {
    localStorage.setItem('cookie', buttonType);
    localStorage.setItem('cookieVisible', 'false');
    document.querySelectorAll('.cookie').forEach(cookie => {
      cookie.style.display = 'none';
    });
    localStorage.setItem('cookieVisible', 'false');

    if (buttonType === true) {
      localStorage.setItem('cookie', 'true');
      new Date().setDate(new Date().getDate() + 365);
      document.cookie = `selectedLanguage=${localStorage.getItem('selectedLanguage')}; expires=` + new Date().toUTCString();
      document.cookie = 'cookieVisible=false';
    }
  }

  return (
    <div className={`cookie flex content-Center items-Center ${theme}`}>
      <div className='flex items-Center cookieTextPicture'>
        <img src={cookiePhoto} alt='cookiePhoto' className='cookiePhoto' />
        <span className={`cookieText ${theme}`}>{selectedLanguage === 'Russia' ? 'Наш сайт использует Сookie.' : selectedLanguage === 'Ukraine' ? 'Наш сайт використовує Сookie.' : selectedLanguage === 'Germany' ? 'Unsere Website verwendet Cookies.' : 'Our website uses Cookies.'}</span>
      </div>
      <div className='flex gapCookieButton'>
        <button className={`cookieButton accept ${theme}`} onClick={() => handleButtonClick(true)}>{selectedLanguage === 'Russia' ? 'Принять' : selectedLanguage === 'Ukraine' ? 'Прийняти' : selectedLanguage === 'Germany' ? 'Akzeptieren' : 'Accept'}</button>
        <button className={`cookieButton reject ${theme}`} onClick={() => handleButtonClick(false)}>{selectedLanguage === 'Russia' ? 'Отклонить' : selectedLanguage === 'Ukraine' ? 'Відхилити' : selectedLanguage === 'Germany' ? 'Ablehnen' : 'Reject'}</button>
      </div>
    </div>
  )
}

export default Cookie;