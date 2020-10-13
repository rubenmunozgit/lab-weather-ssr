import React from 'react';
import App from '../../universal/components/App';
import getGeoWeather from '../serviceClient';
import { renderToString } from 'react-dom/server';

const applicationHandler = async (req, res, next) => {
  try {
    const { geoInfo, weather, error } = await getGeoWeather(req.ip);
    if (error) {
      throw Error(JSON.stringify(error));
    }
    const initialState = {
      ip: req.ip,
      geoInfo,
      weather,
    };

    const siteContext = { context: 'AppContext' };

    const body = renderToString(<App initialState={initialState} />);

    res.render('main', {
      layout: false,
      body,
      baseline: 'baseline',
      initialState: JSON.stringify(initialState),
      siteContext: JSON.stringify(siteContext),
    });
  } catch (error) {
    console.log('server: ' + error);
    next(error);
  }
};

export default applicationHandler;
