import React, { Fragment, useState } from 'react';
import Main from './Content/Main';
import Header from './Header/Header';
import { transformC2F, transformF2C } from '../../server/transforms/metrics';

const App = (props) => {
  const {
    ip,
    geoInfo,
    weather
  } = props.initialState;


  const handleSwitchChange = (value) => {
    const metricValue = !value.target.checked;
    setMetric((metric) => (metric = metricValue));
    if(!metricValue) {
      SetWeather(weatherData => transformC2F(weatherData));
    } else {
      SetWeather(weatherData => transformF2C(weatherData));
    }
  };

  const [metric, setMetric] = useState(true);
  const [weatherData, SetWeather] = useState(weather);

  return (
    <Fragment>
      <Header {...{ metric, handleSwitchChange }} />
      <Main {...geoInfo} {...weatherData} />
    </Fragment>
  );
};

export default App;
