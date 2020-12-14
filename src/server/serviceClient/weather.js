import axios from 'axios';

const getWeather = async ({ lat, lon, units = 'metric' }) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&
    exclude=minutely,hourly&appid=7289e9613cb8f800099af227a5133275`;
  try {
    const { data } = await axios.get(url);
    return { weather: data };
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    return {
      weather: {},
      weathError: {
        status: error.response.status,
        message: error.response.data.message,
      },
    };
  }
};

export default getWeather;
