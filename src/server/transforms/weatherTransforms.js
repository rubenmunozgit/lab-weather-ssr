import { transformK2C } from './metrics';
import { transformTZ } from './transformTZ';

const transformWeather = async ({ weather, geoInfo, locale }) => {
  return await transformTZ(await transformK2C(weather), geoInfo.timezone, locale);
};

export { transformWeather };
