import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import App from '../../universal/components/App';
import getGeoWeather from '../serviceClient';
import { transformWeather } from '../transforms/weatherTransforms';
import {
  buildScriptTags,
  buildStyleTags,
} from '../../utils/buildScriptStylesTags';
import getLang from '../../utils/getLangByLocale';

const applicationHandler = async (req, res, next) => {
  try {
    const locale = req.acceptsLanguages()[0] || 'en-US';
    const lang = getLang(locale);

    const { geoInfo, weather, error } = await getGeoWeather(req.ip, lang);
    if (error) {
      throw Error(JSON.stringify(error));
    }

    const { city, country, lat, lon, regionName, ...ipGeoData } = geoInfo;
    const { timezone } = weather;

    const { current, daily } = await transformWeather({
      weather,
      timeZone: timezone,
      locale,
    });

    const initialState = {
      geo: {
        city,
        country,
        lat,
        lon,
        regionName,
      },
      ipGeoData,
      sys: {
        ip: req.ip,
        locale,
        lang,
      },
      weather: {
        current,
        daily,
      },
    };

    const statsFile = path.resolve('build/static/loadable-stats.json');
    const extractor = new ChunkExtractor({ statsFile });
    const jsx = extractor.collectChunks(<App initialState={initialState} />);
    const styleTags = buildStyleTags(extractor.getStyleTags());
    const scriptTags = buildScriptTags(extractor.getScriptTags());

    const html = renderToString(jsx);

    res.render('react', {
      html,
      baseline: 'baseline',
      locale,
      styleTags,
      scriptTags,
      initialState: JSON.stringify(initialState),
    });
  } catch (error) {
    console.log('server: ' + error);
    next(error);
  }
};

export default applicationHandler;
