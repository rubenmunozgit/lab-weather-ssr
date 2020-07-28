import getLocationByIp from './geoLocation';
import getWeather from './weather';

const extractLatLon = (coords = '') => {
  const latLon = coords.split(',');
  return {
    lat: latLon[0],
    lon: latLon[1],
  };
};

const getGeoWeather = async (ip) => {
  try {
    const { geoInfo, geoError } = await getLocationByIp(ip);
    if (geoError) {
      return { error: geoError };
    }

    const { weather, weathError } = await getWeather(
      extractLatLon(geoInfo.coords)
    );
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
