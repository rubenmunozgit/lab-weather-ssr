import { transformK2C } from './metrics';
import { transformTZ } from './transformTZ';
import getIconSSR from './weatherIcons';

const transformDailyIcon = (daily) => {
  return daily.map((day) => {
    const { icon } = day.weather[0];
    return {
      ...day,
      icon: getIconSSR(icon),
    };
  });
};

const transformIcons = ({ current, daily }) => {
  const icon = current.weather[0].icon;
  return {
    current: {
      ...current,
      icon: getIconSSR(icon),
    },
    daily: transformDailyIcon(daily),
  };
};

const transformWeather = async ({ weather, geoInfo, locale }) => {
  const weatherIcons = await transformIcons(weather);
  return await transformTZ(
    await transformK2C(weatherIcons),
    geoInfo.timezone,
    locale
  );
};

export { transformWeather };
