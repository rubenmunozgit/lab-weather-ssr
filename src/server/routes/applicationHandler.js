import path from 'path';
import React from 'react';
import { ChunkExtractor } from '@loadable/server';
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
    const { current, daily } = await transformWeather({weather, geoInfo, locale});
    const initialState = {
      sys: {
        ip: req.ip,
        locale
      },
      geoInfo,
      weather: {
        current,
        daily
      }
    };

    const siteContext = { context: 'AppContext' };

    const statsFile = path.resolve('build/static/loadable-stats.json');
    const extractor = new ChunkExtractor({ statsFile });
    const jsx = extractor.collectChunks(<App initialState={initialState} />);
    const scriptTags = extractor.getScriptTags();
    const linkTags = extractor.getLinkTags();
    const styleTags = extractor.getStyleTags();

    const body = renderToString(jsx);

    res.render('main', {
      layout: false,
      body,
      baseline: 'baseline',
      locale,
      scriptTags,
      styleTags,
      linkTags,
      initialState: JSON.stringify(initialState),
      siteContext: JSON.stringify(siteContext),
    });
  } catch (error) {
    console.log('server: ' + error);
    next(error);
  }
};

export default applicationHandler;
