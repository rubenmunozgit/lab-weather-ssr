import React from 'react';
import App from '../../universal/components/App';
import getGeoWeather from '../serviceClient';
import { transformWeather } from '../transforms/weatherTransforms';
import { renderToString } from 'react-dom/server';

const applicationHandler = async (req, res, next) => {
  try {
    const locale = req.acceptsLanguages()[0] || 'en-US';
    const { geoInfo, weather, error } = await getGeoWeather(req.ip);
    if (error) {
      throw Error(JSON.stringify(error));
    }
    const { current, daily } = await transformWeather({
      weather,
      timeZone: geoInfo.timezone,
      locale,
    });
    const initialState = {
      sys: {
        ip: req.ip,
        locale,
      },
      geoInfo,
      weather: {
        current,
        daily,
      },
    };

    const siteContext = { context: 'AppContext' };

    const body = renderToString(<App initialState={initialState} />);

    res.render('main', {
      layout: false,
      body,
      baseline: 'baseline',
      locale,
      initialState: JSON.stringify(initialState),
      siteContext: JSON.stringify(siteContext),
    });
  } catch (error) {
    console.log('server: ' + error);
    next(error);
  }
};

export default applicationHandler;
