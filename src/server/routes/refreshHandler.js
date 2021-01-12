import getWeather from '../serviceClient/weather';
import { transformWeather } from '../transforms/weatherTransforms';
const thirtyminutes = 30 * 60;

const refreshHandler = async (req, res, next) => {
  try {
    const { lat, lon, lang, locale = 'en-US', units } = req.query;
    if (!lat || !lon) throw Error('lat or lon must be defined');
    const { weather } = await getWeather({ lat, lon, lang, units });
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
    res.set('Cache-Control', `public, max-age=${thirtyminutes}`);
    res.send(refresh);
  } catch (error) {
    console.log('server: ' + error);
    next(error);
  }
};

export default refreshHandler;
