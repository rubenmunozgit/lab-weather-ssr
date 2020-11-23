import { getShortDateFormated, getTimeFormated } from '../../utils/date';

const transformDailyTZ = (daily, timeZone, locale) => {
  return daily.map((day) => {
    return {
      ...day,
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

const transformTZ = (weather, timezone, locale) => {
  const { dt, sunrise, sunset } = weather.current;
  const daily = weather.daily;
  const timeZone = timezone;
  return {
    current: {
      ...weather.current,
      dt_local: getTimeFormated({ locale, timeZone, date: dt }),
      sunrise_local: getTimeFormated({ locale, timeZone, date: sunrise }),
      sunset_local: getTimeFormated({ locale, timeZone, date: sunset }),
    },
    daily: transformDailyTZ(daily, timeZone, locale),
  };
};

export { transformTZ };
