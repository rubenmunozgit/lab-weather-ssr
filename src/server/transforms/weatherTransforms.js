import { transformK2C } from './metrics';
import { transformTZ } from './transformTZ';

const transformWeather = async ({ weather, geoInfo, locale }) => {
  const weatherMetrincs = await transformK2C(weather);
  return await transformTZ(weatherMetrincs, geoInfo.timezone, locale);
};

export { transformWeather };
