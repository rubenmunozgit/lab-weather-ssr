import React, { Fragment, useState } from 'react';
import Main from './Content/Main';
import Header from './Content/Header';

const App = (props) => {
  const {
    ip,
    geoInfo,
    weather,
  } = props.initialState;

  const [metric, setMetric] = useState(true);

  const handleSwitchChange = (value) => {
    const metricValue = value.target.checked;
    console.log(metricValue);
    setMetric(!metricValue);
  };

  return (
    <Fragment>
      <Header {...{metric, handleSwitchChange}} />
      <Main {...geoInfo} {...weather} />
    </Fragment>
  );
};

export default App;
