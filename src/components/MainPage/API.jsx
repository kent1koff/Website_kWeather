import Cookies from "js-cookie";
let ongoingRequest = null;
let data;
let oldEndpoint;

const makeRequest = async (endpoint) => {
  try {
    const languageToApy = {
      UK : 'en',
      Germany : 'de',
      Russia : 'ru',
      Ukraine : 'ru'
    }
    const selectedLanguageCode = languageToApy[Cookies.get('selectedLanguage') || localStorage.getItem('selectedLanguage') || 'UK'] || 'en';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${endpoint}&lang=${selectedLanguageCode}&units=metric&appid=${process.env.REACT_APP_API_KEY_WEATHER}`);
    const newData = await response.json();
    oldEndpoint = endpoint;
    return newData;
  } catch (error) {
    throw error;
  }
};

export const fetchData = async (endpoint) => {
  if (ongoingRequest && endpoint === oldEndpoint) {
    return ongoingRequest;
  }

  ongoingRequest = makeRequest(endpoint);

  try {
    data = await ongoingRequest;
    ongoingRequest = null;
    return data;
  } catch (error) {
    ongoingRequest = null;
    throw error;
  }
};