import getIcon from '../../utils/weatherIcons';
import { getShortDateFormated, getTimeFormated } from '../../utils/date';

const transformCurrent = async ({ current }, timeZone, locale) => {
  const { icon } = current.weather[0];
  const { dt, sunrise, sunset } = current;
  return {
    ...current,
    icon: getIcon(icon),
    dt_local: await getTimeFormated({ locale, timeZone, date: dt }),
    sunrise_local: await getTimeFormated({ locale, timeZone, date: sunrise }),
    sunset_local: await getTimeFormated({ locale, timeZone, date: sunset }),
  };
};

const transformDaily = ({ daily }, timeZone, locale) => {
  return daily.map((day) => {
    const { icon } = day.weather[0];
    return {
      ...day,
      icon: getIcon(icon),
      dt_local: getShortDateFormated({ locale, timeZone, date: day.dt }),
      sunrise_local: getShortDateFormated({
        locale,
        timeZone,
        date: day.sunrise,
      }),
      sunset_local: getShortDateFormated({
        locale,
        timeZone,
        date: day.sunset,
      }),
    };
  });
};

const transformWeather = async ({ weather, timeZone, locale }) => ({
  current: await transformCurrent(weather, timeZone, locale),
  daily: await transformDaily(weather, timeZone, locale),
});

export { transformWeather };
