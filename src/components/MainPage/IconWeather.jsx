import React, { useState, useEffect } from 'react';
import './WeatherNow/WeatherNow.scss';
import id200d from '../../images/imgWeather/day/200d.svg';
import id201d from '../../images/imgWeather/day/201d.svg';
import id202d from '../../images/imgWeather/day/202d.svg';
import id210_221d from '../../images/imgWeather/day/210_221d.svg';
import id211d from '../../images/imgWeather/day/211d.svg';
import id500d from '../../images/imgWeather/day/500d.svg';
import id501d from '../../images/imgWeather/day/501d.svg';
import id502d from '../../images/imgWeather/day/502d.svg';
import id503_504d from '../../images/imgWeather/day/503_504d.svg';
import id520d from '../../images/imgWeather/day/520d.svg';
import id600d from '../../images/imgWeather/day/600d.svg';
import id601d from '../../images/imgWeather/day/601d.svg';
import id602d from '../../images/imgWeather/day/602d.svg';
import id611d from '../../images/imgWeather/day/611d.svg';
import id612d from '../../images/imgWeather/day/612d.svg';
import id613d from '../../images/imgWeather/day/613d.svg';
import id615d from '../../images/imgWeather/day/615d.svg';
import id621d from '../../images/imgWeather/day/621d.svg';
import id800d from '../../images/imgWeather/day/800d.svg';
import id801d from '../../images/imgWeather/day/801d.svg';
import id802d from '../../images/imgWeather/day/802d.svg';
import id200n from '../../images/imgWeather/night/200n.svg';
import id201n from '../../images/imgWeather/night/201n.svg';
import id202n from '../../images/imgWeather/night/202n.svg';
import id210_221n from '../../images/imgWeather/night/210_221n.svg';
import id211n from '../../images/imgWeather/night/211n.svg';
import id500n from '../../images/imgWeather/night/500n.svg';
import id501n from '../../images/imgWeather/night/501n.svg';
import id502n from '../../images/imgWeather/night/502n.svg';
import id503_504n from '../../images/imgWeather/night/503_504n.svg';
import id520n from '../../images/imgWeather/night/520n.svg';
import id600n from '../../images/imgWeather/night/600n.svg';
import id601n from '../../images/imgWeather/night/601n.svg';
import id602n from '../../images/imgWeather/night/602n.svg';
import id611n from '../../images/imgWeather/night/611n.svg';
import id612n from '../../images/imgWeather/night/612n.svg';
import id613n from '../../images/imgWeather/night/613n.svg';
import id615n from '../../images/imgWeather/night/615n.svg';
import id621n from '../../images/imgWeather/night/621n.svg';
import id800n from '../../images/imgWeather/night/800n.svg';
import id801n from '../../images/imgWeather/night/801n.svg';
import id802n from '../../images/imgWeather/night/802n.svg';
import id212dn from '../../images/imgWeather/212dn.svg';
import id230dn from '../../images/imgWeather/230dn.svg';
import id231dn from '../../images/imgWeather/231dn.svg';
import id232dn from '../../images/imgWeather/232dn.svg';
import id300_301dn from '../../images/imgWeather/300_301dn.svg';
import id302_312_313_314_321dn from '../../images/imgWeather/302_312_313_314_321dn.svg';
import id310_311dn from '../../images/imgWeather/310_311dn.svg';
import id511_531dn from '../../images/imgWeather/511_531dn.svg';
import id521dn from '../../images/imgWeather/521dn.svg';
import id522dn from '../../images/imgWeather/522dn.svg';
import id616dn from '../../images/imgWeather/616dn.svg';
import id620dn from '../../images/imgWeather/620dn.svg';
import id622dn from '../../images/imgWeather/622dn.svg';
import id701_711_721_731_741_751_761_762_771_781dn from '../../images/imgWeather/701_711_721_731_741_751_761_762_771_781dn.svg';
import id803_804dn from '../../images/imgWeather/803_804dn.svg';

const IconWeather = ({ weatherIdIcon, className,  weatherIdCount }) => {
  const [dayOrNight, setDayOrNight] = useState(false);

  useEffect(() => {
    weatherIdCount === '18' || weatherIdCount === '21' || weatherIdCount === '00' || weatherIdCount === '03' ? setDayOrNight(false) : setDayOrNight(true);
  }, [weatherIdCount]);

  const iconsID = {
    200: dayOrNight ? id200d : id200n,
    201: dayOrNight ? id201d : id201n,
    202: dayOrNight ? id202d : id202n,
    210: dayOrNight ? id210_221d : id210_221n,
    211: dayOrNight ? id211d : id211n,
    212: id212dn,
    221: dayOrNight ? id210_221d : id210_221n,
    230: id230dn,
    231: id231dn,
    232: id232dn,
    300: id300_301dn,
    301: id300_301dn,
    302: id302_312_313_314_321dn,
    310: id310_311dn,
    311: id310_311dn,
    312: id302_312_313_314_321dn,
    313: id302_312_313_314_321dn,
    314: id302_312_313_314_321dn,
    321: id302_312_313_314_321dn,
    500: dayOrNight ? id500d : id500n,
    501: dayOrNight ? id501d : id501n,
    502: dayOrNight ? id502d : id502n,
    503: dayOrNight ? id503_504d : id503_504n,
    504: dayOrNight ? id503_504d : id503_504n,
    511: id511_531dn,
    520: dayOrNight ? id520d : id520n,
    521: id521dn,
    522: id522dn,
    531: id511_531dn,
    600: dayOrNight ? id600d : id600n,
    601: dayOrNight ? id601d : id601n,
    602: dayOrNight ? id602d : id602n,
    611: dayOrNight ? id611d : id611n,
    612: dayOrNight ? id612d : id612n,
    613: dayOrNight ? id613d : id613n,
    615: dayOrNight ? id615d : id615n,
    616: id616dn,
    620: id620dn,
    621: dayOrNight ? id621d : id621n,
    622: id622dn,
    701: id701_711_721_731_741_751_761_762_771_781dn,
    711: id701_711_721_731_741_751_761_762_771_781dn,
    721: id701_711_721_731_741_751_761_762_771_781dn,
    731: id701_711_721_731_741_751_761_762_771_781dn,
    741: id701_711_721_731_741_751_761_762_771_781dn,
    751: id701_711_721_731_741_751_761_762_771_781dn,
    761: id701_711_721_731_741_751_761_762_771_781dn,
    762: id701_711_721_731_741_751_761_762_771_781dn,
    771: id701_711_721_731_741_751_761_762_771_781dn,
    781: id701_711_721_731_741_751_761_762_771_781dn,
    803: id803_804dn,
    804: id803_804dn,
    800: dayOrNight ? id800d : id800n,
    801: dayOrNight ? id801d : id801n,
    802: dayOrNight ? id802d : id802n,
  };

  const selectedIcon = iconsID[weatherIdIcon];

  return (
    <img src={selectedIcon} alt={`Weather Icon for ${weatherIdIcon}`} className={className} />
  );
};

export default IconWeather;