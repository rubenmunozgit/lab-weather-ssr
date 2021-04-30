import { getWeatherWithCache } from '../middleware/cache';
import { transformWeather } from '../transforms/weatherTransforms';

const refreshHandler = async (req, res, next) => {
  try {
    const { lat, lon, lang, locale = 'en-US', units } = req.query;
    if (!lat || !lon) throw Error('lat or lon must be defined');
    const { weather, weathError } = await getWeatherWithCache({
      lat,
      lon,
      lang,
      units,
    });
    if (weathError) {
      throw Error(JSON.stringify(weathError));
    }
    const { current, daily } = await transformWeather({
      weather,
      timeZone: weather.timezone,
      locale,
    });
    const refresh = {
      weather: {
        current,
        daily,
      },
    };
    res.send(refresh);
  } catch (error) {
    console.log('server: ' + error);
    next(error);
  }
};

export default refreshHandler;
