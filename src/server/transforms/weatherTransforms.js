import { transformK2C } from './metrics';
import { transformTZ } from './transformTZ';

const transformWeather = ({ weather, geoInfo, locale }) => {
  const weatherMetrincs = transformK2C(weather);
  return transformTZ(weatherMetrincs, geoInfo.timezone, locale);
};

export { transformWeather };
