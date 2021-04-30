import axios from 'axios';

const getWeather = async ({ lat, lon, lang, units }) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&
    exclude=minutely,hourly&appid=${process.env.OPENWEATHER_KEY}`;
  try {
    const { data } = await axios.get(url);
    return { weather: data };
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    return {
      weathError: {
        status: error.response.status,
        message: error.response.data.message,
      },
    };
  }
};

export default getWeather;
