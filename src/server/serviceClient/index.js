import {
  getLocationByIpWithCache,
  getWeatherWithCache,
} from '../middleware/cache';

const getGeoWeather = async (ip) => {
  try {
    const { geoInfo, message } = await getLocationByIpWithCache(ip);
    if (message) {
      return { error: message };
    }

    const { weather, weathError } = await getWeatherWithCache({
      lat: geoInfo.lat,
      lon: geoInfo.lon,
    });
    if (weathError) {
      return { error: weathError };
    }
    return {
      geoInfo,
      weather,
    };
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
};

export default getGeoWeather;
