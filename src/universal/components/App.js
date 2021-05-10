import React, { useState } from 'react';
import Main from './Content/Main';
import Header from './Header/Header';
import { Context } from './Context';
import { transformC2F, transformF2C } from '../../server/transforms/metrics';
import getWeather from '../serviceClient/weather';
import { translations } from '../../translations';

const App = (props) => {
  const {
    sys: { lang, locale },
    geo,
    weather,
  } = props.initialState;

  const context = {
    lang,
    translationText: translations[lang] || translations['en'],
  };

  const handleSwitchChange = (value) => {
    const metricValue = !value.target.checked;
    setMetric((metric) => (metric = metricValue));
    if (!metricValue) {
      SetWeather((weatherData) => transformC2F(weatherData));
    } else {
      SetWeather((weatherData) => transformF2C(weatherData));
    }
  };

  const refreshHandle = async () => {
    const { lat, lon } = geoData;
    const { weather: weaUpdate } = await getWeather({
      lat,
      lon,
      lang,
      locale,
      metric,
    });
    SetWeather((weatherData) => (weatherData = weaUpdate));
  };

  const handleSelectedLocation = async ({
    city,
    country,
    lat,
    lon,
    regionName,
  }) => {
    const { weather: weaUpdate } = await getWeather({
      lat,
      lon,
      lang,
      locale,
      metric,
    });
    setGeoData(
      (geoData) => (geoData = { city, country, lat, lon, regionName })
    );
    SetWeather((weatherData) => (weatherData = weaUpdate));
  };

  const [metric, setMetric] = useState(true);
  const [geoData, setGeoData] = useState(geo);
  const [weatherData, SetWeather] = useState(weather);

  return (
    <Context.Provider value={context}>
      <Header {...{ metric, handleSwitchChange, handleSelectedLocation }} />
      <Main {...geoData} {...weatherData} {...{ metric, refreshHandle }} />
    </Context.Provider>
  );
};

export default App;
