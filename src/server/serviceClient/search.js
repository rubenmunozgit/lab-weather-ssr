import axios from 'axios';

const getSearch = async ({ q, limit }) => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=${limit}&appid=${process.env.OPENWEATHER_KEY}`
    );
    return { searchResults: data };
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    return {
      searchError: {
        status: error.response.status,
        message: error.response.data.message,
      },
    };
  }
};

export default getSearch;
