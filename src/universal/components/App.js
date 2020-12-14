import React, { Fragment, useState } from 'react';
import Main from './Content/Main';
import Header from './Header/Header';
import { transformC2F, transformF2C } from '../../server/transforms/metrics';
import getWeather from '../serviceClient/weather';

const App = (props) => {
  const {
    sys: { locale },
    geoInfo,
    weather,
  } = props.initialState;

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
      locale,
      metric,
    });
    SetWeather((weatherData) => (weatherData = weaUpdate));
  };

  const [metric, setMetric] = useState(true);
  const [weatherData, SetWeather] = useState(weather);

  return (
    <Fragment>
      <Header {...{ metric, handleSwitchChange }} />
      <Main {...geoInfo} {...weatherData} {...{ metric, refreshHandle }} />
    </Fragment>
  );
};

export default App;
