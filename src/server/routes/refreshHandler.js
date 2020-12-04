import getWeather from '../serviceClient/weather';
import { transformWeather } from '../transforms/weatherTransforms';

const refreshHandler = async (req, res, next) => {
  try {
    const { lat, lon, locale = 'en-US' } = req.query;
    if (!lat || !lon) throw Error('lat or lon must be defined');
    const { weather } = await getWeather({ lat, lon });
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
