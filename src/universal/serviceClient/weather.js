import axios from 'axios';

const getWeather = async ({ lat, lon, lang, locale, metric }) => {
  const units = metric ? 'metric' : 'imperial';
  const url = `/refresh?lat=${lat}&lon=${lon}&lang=${lang}&locale=${locale}&units=${units}`;
  try {
    const { data } = await axios.get(url);
    return data;
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
