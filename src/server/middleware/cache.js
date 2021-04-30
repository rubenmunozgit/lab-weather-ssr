import getLocationByIp from '../serviceClient/geoLocation';
import getWeather from '../serviceClient/weather';
import getSearch from '../serviceClient/search';

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
const ONE_HOUR = 1000 * 60 * 60;

const ipCache = {};
const weatherCache = {};
const searchCache = {};

const isCacheExpired = (cache, now) => {
  return now < cache.expiredTime ? false : true;
};

const getLocationByIpWithCache = async (ip) => {
  const now = new Date().getTime();

  if (!ipCache[ip] || isCacheExpired(ipCache[ip], now)) {
    try {
      const { geoInfo, status, message } = await getLocationByIp(ip);
      if (status !== 'success') {
        return { message };
      }
      ipCache[ip] = { geoInfo, expiredTime: now + ONE_WEEK };
      return { geoInfo };
    } catch (err) {
      console.log(err);
      return { error: err.message };
    }
  }

  return ipCache[ip]; // 173.84.194.82
};

const getWeatherWithCache = async ({ lat, lon, lang, units = 'metric' }) => {
  const now = new Date().getTime();

  const key = `${lat}_${lon}_${units}`;
  if (!weatherCache[key] || isCacheExpired(weatherCache[key], now)) {
    const { weather, weathError } = await getWeather({ lat, lon, lang, units });
    if (weathError) {
      return { weathError };
    }
    weatherCache[key] = { weather, expiredTime: now + ONE_HOUR };
    return {
      weather,
    };
  }

  return weatherCache[key];
};

const getSearchWithCache = async ({ lang, limit, q }) => {
  const now = new Date().getTime();

  if (!searchCache[q] || isCacheExpired(searchCache[q], now)) {
    const { searchResults, searchError } = await getSearch({ lang, limit, q });
    if (searchError) {
      return { searchError };
    }
    searchCache[q] = { searchResults, expiredTime: now + ONE_WEEK };
    return {
      searchResults,
    };
  }

  return searchCache[q];
};

export { getLocationByIpWithCache, getSearchWithCache, getWeatherWithCache };
