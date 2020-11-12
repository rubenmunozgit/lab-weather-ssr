import React, { Fragment, useState } from 'react';
import Main from './Content/Main';
import Header from './Content/Header';
import { transform2imperial } from '../../utils/metrics';

const App = (props) => {
  const {
    ip,
    geoInfo,
    weather
  } = props.initialState;

  const [metric, setMetric] = useState(true);
  const {current, daily} = metric ? weather : transform2imperial(weather);

  const handleSwitchChange = (value) => {
    const metricValue = !value.target.checked;
    setMetric((metric) => (metric = metricValue));
  };

  return (
    <Fragment>
      <Header {...{ metric, handleSwitchChange }} />
      <Main {...geoInfo} {...{current, daily}} />
    </Fragment>
  );
};

export default App;
