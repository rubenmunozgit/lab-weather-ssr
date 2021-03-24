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
    geoInfo,
    weather,
  } = props.initialState;

  const context = {
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
    const { lat, lon } = geoInfo;
    const { weather: weaUpdate } = await getWeather({
      lat,
      lon,
      lang,
      locale,
      metric,
    });
    SetWeather((weatherData) => (weatherData = weaUpdate));
  };

  const [metric, setMetric] = useState(true);
  const [weatherData, SetWeather] = useState(weather);

  return (
    <Context.Provider value={context}>
      <Header {...{ metric, handleSwitchChange }} />
      <Main {...geoInfo} {...weatherData} {...{ metric, refreshHandle }} />
    </Context.Provider>
  );
};

export default App;
