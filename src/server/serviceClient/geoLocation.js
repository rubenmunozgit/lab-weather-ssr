import axios from 'axios';

const getLocationByIp = async (ip) => {
  const url = `http://ip-api.com/json/${ip}`; // `https://ipgeolocation.com/${ip}?json=1`;
  try {
    const { data } = await axios.get(url);
    return { geoInfo: data, status: data.status, message: data.message };
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    return {
      geoInfo: {},
      status: error.response.status,
      message: error.response.data,
    };
  }
};
export default getLocationByIp;
